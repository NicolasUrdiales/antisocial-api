const mongoose = require('mongoose')

const validateExists = (Model) => {
    return async (req,res,next) => {
        const id = req.params.id
        const model = await Model.findById(id)
        if(!model){
            return res.status(404).json({ message: `${Model.modelName} no encontrado` })
        }
        next()
    }
}


const validateId = (req, res, next) => {
    //
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'El ID proporcionado no tiene un formato válido' });
    }

    next();
};


module.exports = {
    validateExists,
    validateId

}