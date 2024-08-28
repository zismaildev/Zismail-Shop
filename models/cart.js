import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
