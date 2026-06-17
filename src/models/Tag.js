const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "El nombre de la etiqueta es obligatorio"],
            unique:true,
            trim:true
        }
    },
    {
        timestamps:true

    }
)

tagSchema.virtual('posts', {
    ref: 'Post',          
    localField: '_id',    
    foreignField: 'tags' 
});

module.exports = mongoose.model('Tag', tagSchema)