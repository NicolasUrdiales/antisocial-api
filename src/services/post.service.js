const Post = require('../models/Post')
const PostImage = require('../models/PostImage')
const Tag = require('../models/Tag')
const mongoose = require('mongoose')


const getFechaLimite = () => {
    const limiteMeses = parseInt(process.env.MONTHS_LIMIT || process.env.FECHA_LIMITE_MESES || '6')
    const fechaLimite = new Date()
    fechaLimite.setMonth(fechaLimite.getMonth() - limiteMeses)
    return fechaLimite
}

const getAllPosts = async (page = 1, limit = 10, tagName = null) => {
    let query = {}
    if (tagName) {
        const tag = await Tag.findOne({ name: { $regex: new RegExp(`^${tagName}$`, 'i') } })
        if (tag) {
            query.tags = tag._id
        } else {
            return []
        }
    }

    const skip = (page - 1) * limit

    return await Post.find(query)
        .populate('user', 'nickName')
        .populate('tags', 'name')
        .populate('images', 'url')
        .populate({
            path: 'comments',
            match: { createdAt: { $gte: getFechaLimite() } },
            populate:{path: 'user', select: 'nickName'},
            options: { sort: { createdAt: -1 } }
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
}



const getPostById = async (id) => await Post.findById(id)
    .populate('user', 'nickName')
    .populate('tags', 'name')
    .populate('images', 'url')
    .populate({
        path: 'comments',
        match: { createdAt: { $gte: getFechaLimite() } },
        populate:{path: 'user', select: 'nickName'},
        options: { sort: { createdAt: -1 } }
    })
    .sort({ createdAt: -1 })


const createPost = async (postData) => {
    const {description,user,tags} = postData
    
    let tagIds = []
    if (tags && Array.isArray(tags)) {
        for (const tag of tags) {
            if (mongoose.Types.ObjectId.isValid(tag)) {
                tagIds.push(tag)
            } else if (typeof tag === 'string' && tag.trim()) {
                const cleanTagName = tag.trim().replace(/^#/, '').toLowerCase()
                if (cleanTagName) {
                    let existingTag = await Tag.findOne({ name: { $regex: new RegExp(`^${cleanTagName}$`, 'i') } })
                    if (!existingTag) {
                        existingTag = await Tag.create({ name: cleanTagName })
                    }
                    tagIds.push(existingTag._id)
                }
            }
        }
    }

    const newPost = new Post({
        description,
        user,
        tags: tagIds
    })
    const savedPost = await newPost.save()
    return await getPostById(savedPost._id)
}

const updatePost = async (id, postData) => {
    const updateData = { ...postData }
    if (postData.tags && Array.isArray(postData.tags)) {
        let tagIds = []
        for (const tag of postData.tags) {
            if (mongoose.Types.ObjectId.isValid(tag)) {
                tagIds.push(tag)
            } else if (typeof tag === 'string' && tag.trim()) {
                const cleanTagName = tag.trim().replace(/^#/, '').toLowerCase()
                if (cleanTagName) {
                    let existingTag = await Tag.findOne({ name: { $regex: new RegExp(`^${cleanTagName}$`, 'i') } })
                    if (!existingTag) {
                        existingTag = await Tag.create({ name: cleanTagName })
                    }
                    tagIds.push(existingTag._id)
                }
            }
        }
        updateData.tags = tagIds
    }
    return await Post.findByIdAndUpdate(id, updateData, { new: true })
        .populate('user', 'nickName')
        .populate('tags', 'name')
        .populate('images', 'url')
}

const deletePost = async (id) => await Post.findByIdAndDelete(id)

const addTagToPost = async (postId, tagId) => await Post.findByIdAndUpdate(
    postId, 
    { $push: { tags: tagId } }, 
    { new: true }
)



const addImageToPost = async (postId, url) => {
    const newImage = new PostImage({ url, post: postId });
    return await newImage.save();
}



module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    addTagToPost,
    addImageToPost
}