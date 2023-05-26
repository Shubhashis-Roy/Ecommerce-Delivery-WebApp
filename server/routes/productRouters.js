import express from 'express';
import { createProductController, deleteProductController, getPhotoController, getProductController, getSingleProductController, productFilterController, updateProductController } from '../controllers/ProductController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

// router
// Create
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// Update Product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// Get All Product
router.get('/get-all-product', getProductController);

// Single Product
router.get('/get-sigle-product/:slug', getSingleProductController)

// Get Photo
router.get('/get-photo/:pid', getPhotoController)

// Delete Product
router.delete('/delete-product/:pid', deleteProductController)

// Filters Product
router.post('/product-filters', productFilterController)

export default router;