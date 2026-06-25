const postService = require('../services/post.service')
const catchAsync = require('../utils/catchAsync')
cacheManager = require('../managers/CacheManager')

const getPosts = catchAsync(async (req, res) => {
    const posts = await postService.getAllPosts()
    res.status(200).json(posts)
})

const getPostByID = catchAsync(async (req, res) => {
    const id = req.params.id
    const post = await postService.getPostById(id)
    res.status(200).json(post)
})

const createPost = catchAsync(async (req, res) => {
    const postData = req.body
    const newPost = await postService.createPost(postData)
    cacheManager.clear()
    res.status(201).json(newPost)
})

const updatePost = catchAsync(async (req, res) => {
    const id = req.params.id
    const postData = req.body
    const updatedPost = await postService.updatePost(id, postData)
    cacheManager.clear()
    res.status(200).json(updatedPost)
})

const deletePost = catchAsync(async (req, res) => {
    const id = req.params.id
    await postService.deletePost(id)
    cacheManager.clear()
    res.status(204).json({ message: 'Post eliminado con éxito' })
})

const agregarTagAPost = catchAsync(async (req, res) => {
    const postId = req.params.id
    const tagId = req.body.tagId
    const updatedPost = await postService.addTagToPost(postId, tagId)
    cacheManager.clear()
    res.status(200).json(updatedPost)
})

const addImageToPost = catchAsync(async (req, res) => {
    const postId = req.params.id
    const { url } = req.body
    const newImage = await postService.addImageToPost(postId, url)
    cacheManager.clear()
    res.status(201).json(newImage)
})








module.exports = {
    getPosts,
    getPostByID,
    createPost,
    updatePost,
    deletePost,
    addImageToPost,
    agregarTagAPost
}

