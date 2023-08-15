import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
