const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        nickName: {
            type: String,
            required: [true, "El nickname es obligatorio"],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "La contraseña es obligatoria"]
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false
    }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'user'
});

userSchema.virtual('comentarios', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'user'
});

module.exports = mongoose.model('User', userSchema);