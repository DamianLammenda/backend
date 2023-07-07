import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

class CartManager {
  constructor(path) {
    this.carts = {};
    this.path = path;
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      this.carts = JSON.parse(data);
    } catch (error) {
      // Si ocurre un error al leer el archivo, se asume que el archivo no existe o está vacío.
      // Se inicializa el objeto de carritos como un objeto vacío.
      this.carts = {};
    }
  }

  async saveCarts() {
    const data = JSON.stringify(this.carts, null, 2);
    await fs.writeFile(this.path, data);
  }

  async createCart(cartId) {
    if (this.carts[cartId]) {
      console.log("Error: El carrito ya existe.");
      return;
    }

    this.carts[cartId] = [];
    await this.saveCarts(); // Guardar los carritos actualizados en el archivo
    console.log("Carrito creado:", cartId);
  }

  async addToCart(cartId, product) {
    if (!this.carts[cartId]) {
      console.log("Error: El carrito no existe.");
      return;
    }

    const newProduct = {
      ...product,
      id: uuidv4(),
    };

    this.carts[cartId].push(newProduct);
    await this.saveCarts(); // Guardar los carritos actualizados en el archivo
    console.log("Producto agregado al carrito:", newProduct);
  }

  async removeFromCart(cartId, productId) {
    if (!this.carts[cartId]) {
      console.log("Error: El carrito no existe.");
      return;
    }

    const cart = this.carts[cartId];
    const productIndex = cart.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      console.log("Error: Producto no encontrado en el carrito.");
      return;
    }

    const removedProduct = cart.splice(productIndex, 1)[0];
    await this.saveCarts(); // Guardar los carritos actualizados en el archivo
    console.log("Producto eliminado del carrito:", removedProduct);
  }

  getCart(cartId) {
    if (!this.carts[cartId]) {
      console.log("Error: El carrito no existe.");
      return [];
    }

    return this.carts[cartId];
  }

  async emptyCart(cartId) {
    if (!this.carts[cartId]) {
      console.log("Error: El carrito no existe.");
      return;
    }

    this.carts[cartId] = [];
    await this.saveCarts(); // Guardar los carritos actualizados en el archivo
    console.log("Carrito vaciado:", cartId);
  }
}

export default CartManager;
