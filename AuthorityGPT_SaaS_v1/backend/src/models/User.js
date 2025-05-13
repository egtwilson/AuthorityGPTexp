import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  hasLicensing: { type: Boolean, default: false }, // Add this field
  // projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }], // To be implemented
  // subscription: { // To be implemented for Stripe
  //   plan: { type: String, enum: ['monthly', 'none'], default: 'none' },
  //   stripeCustomerId: String,
  //   stripeSubscriptionId: String,
  //   status: String, // e.g., 'active', 'canceled', 'past_due'
  // },
  // onboardingCompleted: { type: Boolean, default: false }, // To be implemented
  // isAdmin: { type: Boolean, default: false } // For admin access
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
