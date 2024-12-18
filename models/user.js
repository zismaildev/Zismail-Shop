import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  role: {
    type: String,
    enum: ['admin', 'developer', 'member'],
    default: 'member',
  },
  profilePicture: {
    type: String,
    default: '', // Default to an empty string if no profile picture is set
  },
  cart: {
    type: [CartItemSchema], // เปลี่ยนเป็นใช้ CartItemSchema
    default: [],
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
