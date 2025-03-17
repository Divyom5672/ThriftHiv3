// File: config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// File: utils/errorResponse.js
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;

// File: utils/asyncHandler.js
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;

// File: utils/jwtHelpers.js
const jwt = require('jsonwebtoken');

// Generate token
exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// File: utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;

// File: middleware/error.js
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.log(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;

// File: middleware/upload.js
const multer = require('multer');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allow only images
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ErrorResponse('Please upload an image file', 400), false);
  }
};

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: fileFilter
});

// Upload to Cloudinary
exports.uploadToCloudinary = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'luxury-thrift',
    use_filename: true
  });
};

// Delete from Cloudinary
exports.deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

// File: controllers/authController.js
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const { generateToken } = require('../utils/jwtHelpers');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register user
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  
  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user'
  });

  // Generate verification token
  const verificationToken = crypto.randomBytes(20).toString('hex');
  user.verificationToken = verificationToken;
  await user.save();

  // Create verification url
  const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;
  
  // Send email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Email Verification',
      html: `<p>Please verify your email by clicking on the following link: 
             <a href="${verificationUrl}">Verify Email</a></p>`
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    user.verificationToken = undefined;
    await user.save();
    
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// Verify email
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  
  const user = await User.findOne({ verificationToken: token });
  
  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }
  
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  
  res.status(200).json({ 
    success: true, 
    data: 'Email verified successfully' 
  });
});

// Login user
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  
  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  
  // Check for user
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  
  sendTokenResponse(user, 200, res);
});

// Google login
exports.googleLogin = asyncHandler(async (req, res, next) => {
  const { idToken } = req.body;
  
  // Verify the token
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  
  const { name, email, picture, sub } = ticket.getPayload();
  
  // Check if user exists
  let user = await User.findOne({ email });
  
  if (!user) {
    // Create new user
    user = await User.create({
      name,
      email,
      googleId: sub,
      profileImage: picture,
      isVerified: true
    });
  } else if (!user.googleId) {
    // Link Google ID to existing user
    user.googleId = sub;
    user.isVerified = true;
    await user.save();
  }
  
  sendTokenResponse(user, 200, res);
});

// Logout user
exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {}
  });
});

// Get current logged in user
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('wishlist');
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// Update user details
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };
  
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// Update password
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  
  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }
  
  user.password = req.body.newPassword;
  await user.save();
  
  sendTokenResponse(user, 200, res);
});

// Forgot password
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  
  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }
  
  // Get reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Hash token and set to resetPasswordToken field
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Set expire
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min
  
  await user.save();
  
  // Create reset URL
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
  
  // Send email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      html: `<p>You requested a password reset. Please click on the following link to reset your password: 
             <a href="${resetUrl}">Reset Password</a></p>
             <p>If you didn't request this, please ignore this email.</p>`
    });
    
    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();
    
    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// Reset password
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');
  
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });
  
  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }
  
  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  
  sendTokenResponse(user, 200, res);
});

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = generateToken(user._id);
  
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      profileImage: user.profileImage
    }
  });
};

// File: controllers/productController.js
const Product = require('../models/Product');
const Review = require('../models/Review');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const { uploadToCloudinary, deleteFromCloudinary } = require('../middleware/upload');
const fs = require('fs');

// Get all products
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// Get single product
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate({
      path: 'brand',
      select: 'name logo'
    })
    .populate({
      path: 'category',
      select: 'name'
    })
    .populate({
      path: 'seller',
      select: 'name rating reviewCount'