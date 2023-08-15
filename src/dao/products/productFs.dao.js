import ContainerFs from "../../containers/container.fs.js";

class ProductsFs extends ContainerFs {
  constructor() {
    super("products");
  }
}

export default ProductsFs;