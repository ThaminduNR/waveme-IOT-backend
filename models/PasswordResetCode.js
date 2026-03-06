const mongoose = require('mongoose');

const passwordResetCodeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true
    },
    code: {
      type: String,
      required: [true, 'Please provide a reset code'],
      length: 6
    },
    expiresAt: {
      type: Date,
      required: true
    },
    used: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

// TTL index to automatically delete documents 15 minutes after creation
passwordResetCodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 });

module.exports = mongoose.model('PasswordResetCode', passwordResetCodeSchema);
