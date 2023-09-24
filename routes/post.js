const express = require('express');
const {getProducts, getProductsDetail, updateProducts, deleteProducts,CreateProducts,searchPost} = require('../Controllers/post.js');
const auth = require('../Middleware/auth.js');
const router = express.Router();

router.get('/getPosts', getProducts)
router.post('/createProducts',auth, CreateProducts)
router.get('/getDetail/:id', auth, getProductsDetail)
router.patch('/getUpdate/:id', auth, updateProducts)
router.delete('/deletePost/:id', auth, deleteProducts)
router.get('/searchPost',searchPost )
module.exports = router;