const commentService = require('../services/comment.service');
const catchAsync = require('../utils/catchAsync');

const getComments = catchAsync(async (req, res) => {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
});

const getCommentById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const comment = await commentService.getCommentById(id);
    res.status(200).json(comment);
});

const getCommentsByPost = catchAsync(async (req, res) => {
    const postId = req.params.postId;
    const comments = await commentService.getCommentsByPost(postId);
    res.status(200).json(comments);
});

const createComment = catchAsync(async (req, res) => {
    const commentData = req.body;
    const newComment = await commentService.createComment(commentData);
    res.status(201).json(newComment);
});

const updateComment = catchAsync(async (req, res) => {
    const id = req.params.id;
    const commentData = req.body;
    const updatedComment = await commentService.updateComment(id, commentData);
    res.status(200).json(updatedComment);
});

const deleteComment = catchAsync(async (req, res) => {
    const id = req.params.id;
    await commentService.deleteComment(id);
    res.status(204).json({ message: 'Comentario eliminado correctamente' });
});

module.exports = {
    createComment,
    getCommentsByPost,
    getComments,
    getCommentById,
    updateComment,
    deleteComment

};