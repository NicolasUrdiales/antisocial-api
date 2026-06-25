const PostImage = require('../models/PostImage')


const getAllPostImages = async () => await PostImage.find()

const getPostImageById = async (id) => await PostImage.findById(id)

const createPostImage = async (imageData) => await PostImage.create(imageData)

const updatePostImage = async (id, imageData) => await PostImage.findByIdAndUpdate(id, imageData, { new: true })

const deletePostImage = async (id) => await PostImage.findByIdAndDelete(id)

module.exports = {
    getAllPostImages,
    getPostImageById,
    createPostImage,
    updatePostImage,
    deletePostImage
}