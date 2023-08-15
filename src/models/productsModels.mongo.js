import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";



const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

productSchema.plugin(paginate);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
