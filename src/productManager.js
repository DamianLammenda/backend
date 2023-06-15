import { v4 as uuidv4 } from 'uuid';

export default class ProductManager {
  constructor() {
    this.products = [];
    this.productId = 0;
  }

  addProduct(product) {
    if (!this.isProductValid(product)) {
      console.error('All fields are required.');
      return;
    }

    if (this.isCodeDuplicate(product.code)) {
      console.error('The code is already in use.');
      return;
    }

    const newProduct = {
      ...product,
        id: uuidv4(),
    };

    this.products.push(newProduct);
    console.info('Product added:', newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.error('Product not found.');
    }
  }

  isProductValid(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    return title && description && price && thumbnail && code && stock;
  }

  isCodeDuplicate(code) {
    return this.products.some((product) => product.code === code);
  }
}


