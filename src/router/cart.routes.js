import express from 'express';
import CartManager from '../services/cart/cartManager.js';
import ProductManager from '../services/product/productManager.js';

const router = express.Router();

const cartManager = new CartManager('./src/services/cart/cart.json');
const productManager = new ProductManager('./src/services/product/product.json');


// Ruta para crear un carrito
router.post('/', (req, res) => {
   try {
        const cart = req.body;
        cartManager.createCart(cart);
        res.status(201).json({ success: true, message: 'Carrito creado', cart });
   }
    catch (error) {
        res.status(500).send({success: false, error: error.message});
    }
});

  



// Ruta para obtener el contenido del carrito
router.get('/:cid', (req, res) => {
  const { cid } = req.params;

  if (!cartManager.carts[cid]) {
    return res.status(404).json({ error: 'El carrito no existe.' });
  }

  const cart = cartManager.getCart(cid);
  res.status(200).json(cart);
});

// Ruta para agregar un producto al carrito
router.post('/:cid/products/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (!cartManager.carts[cid]) {
    return res.status(404).json({ error: 'El carrito no existe.' });
  }

  if (!productManager.products[pid]) {
    return res.status(404).json({ error: 'El producto no existe.' });
  }

  cartManager.addToCart(cid, pid, quantity);
  res.status(201).json({ message: 'Producto agregado al carrito.' });
});



 

// Ruta para eliminar un producto del carrito
router.delete('/:cid/:pid', (req, res) => {
  const { cid, pid } = req.params;

  if (!cartManager.carts[cid]) {
    return res.status(404).json({ error: 'El carrito no existe.' });
  }

  const cart = cartManager.carts[cid];
  const productIndex = cart.findIndex((p) => p.id === pid);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'El producto no existe en el carrito.' });
  }

  cart.splice(productIndex, 1);
  cartManager.saveCarts();

  res.status(200).json({ message: 'Producto eliminado del carrito.' });
});

// Ruta para vaciar el carrito
router.delete('/:cid', (req, res) => {
  const { cid } = req.params;

  if (!cartManager.carts[cid]) {
    return res.status(404).json({ error: 'El carrito no existe.' });
  }

  cartManager.emptyCart(cid);
  res.status(200).json({ message: 'Carrito vaciado.' });
});

export default router;
