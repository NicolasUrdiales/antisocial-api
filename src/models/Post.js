const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        description:{
            type:String,
            required:[true, "La descripcion es obligatoria"]
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:[true, "El usuario es obligatorio"]
        },
        tags:
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Tag",
                    index: true
                }
            ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Post', postSchema)