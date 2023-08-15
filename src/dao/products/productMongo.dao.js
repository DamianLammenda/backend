import ContainerMongo from "../../containers/container.mongo.js";
import productModel from "../../models/productsModels.mongo.js";

class ProductsMongo extends ContainerMongo {
  constructor() {
    super(productModel);
  }
}

export default ProductsMongo;