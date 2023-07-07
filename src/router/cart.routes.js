import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import CartManager from '../services/cart/cartManager.js';

const router = express.Router();

const cartManager = new CartManager('./src/services/cart/cart.json');


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
router.get('/:cartId', (req, res) => {
  const { cartId } = req.params;

  if (!cartManager.carts[cartId]) {
    return res.status(404).json({ error: 'El carrito no existe.' });
  }

  const cart = cartManager.getCart(cartId);
  res.status(200).json(cart);
});

// Ruta para agregar un producto al carrito
router.post('/:cartId', (req, res) => {
  const { cartId } = req.params;
  const { productId } = req.body;

  if (!cartManager.carts[cartId]) {
    return res.status(404).json({ error: 'El carrito no existe.' });
  }

  const product = productManager.getProductById(productId);

  if (!product) {
    return res.status(404).json({ error: 'El producto no existe.' });
  }

  const cart = cartManager.carts[cartId];
  cart.push({ id: uuidv4(), ...product });
  cartManager.saveCarts();

  res.status(201).json({ message: 'Producto agregado al carrito.' });
});

// Ruta para eliminar un producto del carrito
router.delete('/:cartId/:productId', (req, res) => {
  const { cartId, productId } = req.params;

  if (!cartManager.carts[cartId]) {
    return res.status(404).json({ error: 'El carrito no existe.' });
  }

  const cart = cartManager.carts[cartId];
  const productIndex = cart.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'El producto no existe en el carrito.' });
  }

  cart.splice(productIndex, 1);
  cartManager.saveCarts();

  res.status(200).json({ message: 'Producto eliminado del carrito.' });
});

// Ruta para vaciar el carrito
router.delete('/:cartId', (req, res) => {
  const { cartId } = req.params;

  if (!cartManager.carts[cartId]) {
    return res.status(404).json({ error: 'El carrito no existe.' });
  }

  cartManager.emptyCart(cartId);
  res.status(200).json({ message: 'Carrito vaciado.' });
});

export default router;
