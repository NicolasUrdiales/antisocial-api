const userService = require('../services/user.service');
const catchAsync = require('../utils/catchAsync');

const getUsers = catchAsync(async (req, res) => {
    const { nickName } = req.query;
    const users = await userService.getAllUsers(nickName);
    res.status(200).json(users);
});

const getUserById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
});

const getUserByNickName = catchAsync(async (req, res) => {
    const { nickName } = req.params;
    const user = await userService.getUserByNickName(nickName);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
});

const createUser = catchAsync(async (req, res) => {
    const data = req.body;
    const user = await userService.createUser(data);
    res.status(201).json(user);
});

const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
});

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
});

const getCommentsByUserId = catchAsync(async (req, res) => {
    const comments = await userService.getCommentsByUserId(req.params.id);
    res.status(200).json(comments);
});

const getPostsByUserId = catchAsync(async (req, res) => {
    const posts = await userService.getPostsByUserId(req.params.id);
    res.status(200).json(posts);
});

const seguirUsuario = catchAsync(async (req, res) => {
    const result = await userService.followUser(req.params.id, req.params.idASeguir);
    res.status(200).json(result);
});

const dejarSeguirUsuario = catchAsync(async (req, res) => {
    const idToUnfollow = req.params.idToUnfollow || req.params.idASeguir;
    const result = await userService.unfollowUser(req.params.id, idToUnfollow);
    res.status(200).json(result);
});

const loginUsuario = catchAsync(async (req, res) => {
    const { nickName, password } = req.body;
    const user = await userService.loginUser(nickName, password);
    if (!user) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    res.status(200).json(user);
});
  



module.exports = {
    getUsers,
    getUserById,
    getUserByNickName,
    createUser,
    updateUser,
    deleteUser,
    getCommentsByUserId,
    getPostsByUserId,
    seguirUsuario,
    dejarSeguirUsuario,
    loginUsuario
};