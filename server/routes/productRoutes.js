import express from 'express';
import { addProduct, getProducts, deleteProduct } from '../controllers/productControllers.js';

const router = express.Router();

router.post('/addProduct', addProduct);
router.get('/getAllProduct', getProducts);
router.delete('/deleteProduct/:id', deleteProduct);

export default router;
