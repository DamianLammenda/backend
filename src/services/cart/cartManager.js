import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import productManager from "../product/productManager.js";

const CART_FILE_PATH = "./src/services/cart/cart.json";

class CartManager {
  constructor() {
    this.carts = {};
    this.path = CART_FILE_PATH;
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(CART_FILE_PATH, "utf8");
      this.carts = JSON.parse(data);
    } catch (error) {
      // Si ocurre un error al leer el archivo, se asume que el archivo no existe o está vacío.
      // Se inicializa el objeto de carritos como un objeto vacío.
      this.carts = {};
    }
  }

  async saveCarts() {
    const data = JSON.stringify(this.carts, null, 2);
    await fs.writeFile(CART_FILE_PATH, data);
  }

  createCart() {
    const cartId = uuidv4();
    this.carts[cartId] = [];
    this.saveCarts(); // Guardar los carritos actualizados en el archivo
    return cartId;
  }

  addToCart(cartId, productId, quantity) {
    if (!this.carts[cartId]) {
      throw new Error("El carrito no existe.");
    }
    const product = new productManager().getProductById(productId);
    if (!product) {
      throw new Error("El producto no existe.");
    }
    const cart = this.carts[cartId];
    const productIndex = cart.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      cart.push({
        ...product,
        quantity,
      });
    } else {
      cart[productIndex].quantity += quantity;
    }
    this.saveCarts(); // Guardar los carritos actualizados en el archivo
  }



  
  removeFromCart(cartId, productId) {
    if (!this.carts[cartId]) {
      throw new Error("El carrito no existe.");
    }

    const cart = this.carts[cartId];
    const productIndex = cart.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      throw new Error("El producto no se encuentra en el carrito.");
    }

    cart.splice(productIndex, 1);
    this.saveCarts(); // Guardar los carritos actualizados en el archivo
  }

  deleteCart(cartId) {
    if (!this.carts[cartId]) {
      throw new Error("El carrito no existe.");
    }

    delete this.carts[cartId];
    this.saveCarts(); // Guardar los carritos actualizados en el archivo
  }

  updateCart(cartId, updatedCart) {
    if (!this.carts[cartId]) {
      throw new Error("El carrito no existe.");
    }

    this.carts[cartId] = updatedCart;
    this.saveCarts(); // Guardar los carritos actualizados en el archivo
  }

  getCart(cartId) {
    if (!this.carts[cartId]) {
      throw new Error("El carrito no existe.");
    }

    return this.carts[cartId];
  }
}

export default CartManager;
