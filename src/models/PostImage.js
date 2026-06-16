const mongoose = require('mongoose')

const postImageSchema = new mongoose.Schema(
    {
        url:{
            type:String,
            required:[true, "La url es obligatoria"]
        },
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post",
            required:[true, "El post es obligatorio"]
        }

    },
    {
        timestamps:true

    }
)

module.exports = mongoose.model('PostImage', postImageSchema)