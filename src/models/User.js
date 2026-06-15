const moongose = require('mongoose')

const userSchema = new moongose.Schema(
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

const User = moongose.model('User', userSchema)

module.exports = User