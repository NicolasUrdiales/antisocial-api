const User = require('../models/User')
const Comment = require('../models/Comment')

const getAllUsers = async (nickName) => {
    const filter = {};
    if (nickName) {
        filter.nickName = nickName;
    }
    return await User.find(filter)
        .populate('nickName followers')
        .populate('nickName following');
};

const getUserById = async (id) => await User.findById(id)
    .populate('comentarios') 
    .populate('posts', 'description createdAt') 
    .populate('followers', 'nickName')
    .populate('following', 'nickName');

const getUserByNickName = async (nickName) => await User.findOne({ nickName })
    .populate('comentarios') 
    .populate('posts', 'description createdAt') 
    .populate('followers', 'nickName')
    .populate('following', 'nickName');





const createUser = async (userData) => await User.create(userData);

const updateUser = async (id, userData) => {
    const user = await User.findById(id);
    if (!user) return null;
    for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
            user[key] = userData[key];
        }
    }
    return await user.save();
};

const deleteUser = async (id) => await User.findByIdAndDelete(id);

const getCommentsByUserId = async (userId) => await Comment.find({ user: userId })
    .populate('user', 'nickName')
    .populate('post', 'description');




const getPostsByUserId = async (userId) => {
    const user = await User.findById(userId).populate('posts', 'description createdAt');
    return user ? user.posts : [];
}

const bcrypt = require('bcryptjs');

const followUser = async (userId, followId) => {
    await User.findByIdAndUpdate(userId, { $addToSet: { following: followId } });
    await User.findByIdAndUpdate(followId, { $addToSet: { followers: userId } });
    return { message: 'Comenzaste a seguir a este usuario exitosamente' };
}

const unfollowUser = async (userId, followId) => {
    await User.findByIdAndUpdate(userId, { $pull: { following: followId } });
    await User.findByIdAndUpdate(followId, { $pull: { followers: userId } });
    return { message: 'Dejaste de seguir a este usuario exitosamente' };
}

const loginUser = async (nickName, password) => {
    const user = await User.findOne({ nickName })
        .populate('comentarios') 
        .populate('posts', 'description createdAt') 
        .populate('followers', 'nickName')
        .populate('following', 'nickName');
    
    if (!user) return null;
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    
    return user;
}


module.exports = {
    getAllUsers,
    getUserById,
    getUserByNickName,
    createUser,
    updateUser,
    deleteUser,
    getCommentsByUserId,
    getPostsByUserId,
    followUser,
    unfollowUser,
    loginUser
};