const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        nickName:{
            type:String,
            required:[true, "El nickname es obligatorio"],
            unique:true,
            trim:true
        }
    },
    {
        timestamps:true

    }
)

const User = mongoose.model('User', userSchema)

module.exports = User