const User = require('../models/User');
const Comment = require('../models/Comment');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('nickName followers');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        
        const user = await User.findById(id)
            .populate('comentarios') 
            .populate('posts', 'description createdAt') 
            .populate('followers', 'nickName'); 

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener el usuario: ${error.message}` });
    }
};

const createUser = async (req, res) => {
    try {
        const { nickName } = req.body;
        const newUser = await User.create({ nickName });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: `Error al crear el usuario: ${error.message}` });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { nickName } = req.body; 
        
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { nickName }, 
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: `Error al actualizar el usuario: ${error.message}` });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar el usuario: ${error.message}` });
    }
};

const getCommentsByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const comentarios = await Comment.find({ user: id }).populate('user', 'nickName').populate('post', 'description');
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios del usuario' });
    }
};

const getPostsByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate('posts', 'description createdAt'); 

        res.status(200).json(user.posts);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener los posts: ${error.message}` });
    }
};

const seguirUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const idASeguir = req.params.idASeguir;

        await User.findByIdAndUpdate(id, {
            $addToSet: { following: idASeguir }
        });

        await User.findByIdAndUpdate(idASeguir, {
            $addToSet: { followers: id }
        });

        res.status(200).json({ message: 'Comenzaste a seguir a este usuario exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al seguir al usuario', error: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getCommentsByUserId,
    getPostsByUserId,
    seguirUsuario
};