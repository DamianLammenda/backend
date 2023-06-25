import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      // Si ocurre un error al leer el archivo, se asume que el archivo no existe o está vacío.
      // Se inicializa la lista de productos como un arreglo vacío.
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  addProduct(product) {
    if (!this.isProductValid(product)) {
      console.log("Error: Todos los campos del producto son obligatorios.");
      return;
    }

    const isCodeDuplicate = this.products.some((p) => p.code === product.code);
    if (isCodeDuplicate) {
      console.log("Error: El código del producto ya existe.");
      return;
    }

    const newProduct = {
      ...product,
      id: uuidv4(),
    };

    this.products.push(newProduct);
    this.saveProducts(); // Guardar los productos actualizados en el archivo
    console.log("Producto agregado:", newProduct);
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      console.log("Error: Producto no encontrado.");
      return;
    }

    const updatedProduct = {
      ...this.products[productIndex],
      ...updatedFields,
      id,
    };

    // Validar si el código del producto actualizado ya existe, excluyendo el producto actual
    const isCodeDuplicate = this.products.some(
      (p) => p.code === updatedProduct.code && p.id !== id
    );

    if (isCodeDuplicate) {
      console.log("Error: El código del producto ya existe.");
      return;
    }

    this.products[productIndex] = updatedProduct;
    this.saveProducts(); // Guardar los productos actualizados en el archivo
    console.log("Producto actualizado:", updatedProduct);
    return updatedProduct; // Devolver el producto actualizado
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      console.log("Error: Producto no encontrado.");
      return;
    }

    const deletedProduct = this.products.splice(productIndex, 1)[0];
    this.saveProducts(); // Guardar los productos actualizados en el archivo
    console.log("Producto eliminado:", deletedProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado.");
      return undefined;
    }
  }

  isProductValid(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    return (
      title !== undefined &&
      description !== undefined &&
      price !== undefined &&
      thumbnail !== undefined &&
      code !== undefined &&
      stock !== undefined
    );
  }
}

export default ProductManager;

