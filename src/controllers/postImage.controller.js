const postImageService = require('../services/postImage.service');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs').promises;
const path = require('path');

const getPostImages = catchAsync(async (req, res) => {
    const postImages = await postImageService.getAllPostImages();
    res.status(200).json(postImages);
})

const getPostImageById = catchAsync(async (req, res) => {
    const postImage = await postImageService.getPostImageById(req.params.id);
    res.status(200).json(postImage);
});

const createPostImage = catchAsync(async (req, res) => {
    const { post } = req.body;

    const PORT = process.env.PORT || 4002;
    const urlLocal = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    const newPostImage = await postImageService.createPostImage({
        url: urlLocal,
        post
    });

    res.status(201).json(newPostImage);
});

const updatePostImage = catchAsync(async (req, res) => {
    const { url } = req.body;
    const updatedPostImage = await postImageService.updatePostImage(req.params.id, { url });
    res.status(200).json(updatedPostImage);
});

const deletePostImage = catchAsync(async (req, res) => {
    const deletedPostImage = await postImageService.deletePostImage(req.params.id);

    if (deletedPostImage && deletedPostImage.url) {
        
        const filename = deletedPostImage.url.split('/').pop(); 
        
        const filePath = path.join(__dirname, '../imagenes', filename);

        try {
            await fs.unlink(filePath);
        } 
        catch (err) {
            console.error(`Aviso: No se pudo borrar el archivo físico ${filename}:`, err.message);
        }
    }
    
    
    res.status(200).json({ message: 'Imagen eliminada correctamente' });
});




module.exports = {
    getPostImages,
    getPostImageById, 
    updatePostImage, 
    createPostImage,
    deletePostImage
};