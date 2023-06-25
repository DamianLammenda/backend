import ProductManager from "./productManager.js";

// Ejemplo de uso
const productManager = new ProductManager("products.json");

productManager.addProduct({
  title: "Remera",
  description: "Remera de algodón",
  price: 20,
  thumbnail: "./img/cam001.jpg",
  code: "CAM001",
  stock: 10,
});

productManager.addProduct({
  title: "Pantalón",
  description: "Pantalón de jean",
  price: 50,
  thumbnail: "./img/p001.jpeg",
  code: "PAN001",
  stock: 10,
});

// const allProducts = productManager.getProducts();
// console.log(`All products:`, allProducts);

// const productById = productManager.getProductById(allProducts[0].id);
// console.log(`Product by id:`, productById);

productManager.updateProduct(
  "5710b967-f09b-4ead-a115-27246c769cad",
  { title: "Remera actualizada", price: 390 }
);

//productManager.deleteProduct("5710b967-f09b-4ead-a115-27246c769cad");
