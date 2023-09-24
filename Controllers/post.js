
const PostSchema = require('../Models/post.js');
// getPost
const getProducts = async (req, res) => {
    try {
        const newProducts = await PostSchema.create(req.body);
        res.status(201).json(
            "OK",
            newProducts
        )
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//CreateProducts
const CreateProducts = async (req, res) => {
    try {
        const newProduct = new PostSchema(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(
            "OK",
            savedProduct
        )
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// getDetail
const getProductsDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const PostDetail = await PostSchema.findById(id);
        res.status(200).json(
            "Ok",
            PostDetail
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
// updatePrducts
const updateProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(
            "Ok",
            updatePost
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
// deletePost
const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params
       await PostSchema.findByIdAndDelete(id);
        res.status(201).json(

            { message: 'Post deleted successfully' }
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const searchPost = async (req, res)=>{
    const { search, tag } = req.query;
    try {
        const title = new RegExp(search, "i")
        const posts = await PostSchema.find({ $or: [{ title }], tag: { $in: tag.split(",") } })
        res.status(200).json(
            posts
        );
    } catch (error) {
        res.status(500).json({ message: err.message });

    }
}
module.exports = { getProducts, getProductsDetail, updateProducts, deleteProducts, CreateProducts ,searchPost}