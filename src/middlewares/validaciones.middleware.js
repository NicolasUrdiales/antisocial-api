const mongoose = require('mongoose')

const validateExists = (Model, paramKey = 'id') => {
    return async (req, res, next) => {
        const id = req.params[paramKey] || req.body[paramKey];
        if (!id) {
            return res.status(400).json({ error: `El campo/parámetro ${paramKey} es obligatorio` });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: `El ID de ${Model.modelName} proporcionado no tiene un formato válido` });
        }
        const model = await Model.findById(id)
        if (!model) {
            return res.status(404).json({ message: `${Model.modelName} no encontrado` })
        }
        next()
    }
}

const validateId = (req, res, next) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'El ID proporcionado no tiene un formato válido' });
    }
    next();
};

const validateIdParam = (paramKey) => {
    return (req, res, next) => {
        const id = req.params[paramKey]
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: `El parámetro ${paramKey} no tiene un formato de ID válido` });
        }
        next();
    };
};

const validateUserBody = (req, res, next) => {
    const { nickName } = req.body;
    if (!nickName || typeof nickName !== 'string' || nickName.trim() === '') {
        return res.status(400).json({ error: 'El nickName es obligatorio' });
    }
    if (nickName.length < 5 || nickName.length > 30) {
        return res.status(400).json({ error: 'El nickName debe tener entre 5 y 30 caracteres' });
    }
    next();
};

const validatePostBody = (req, res, next) => {
    const { description } = req.body;
    const user = req.body.user || req.params.userId;
    if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'La descripción del post es obligatoria' });
    }
    if (!user) {
        return res.status(400).json({ error: 'El usuario creador es obligatorio' });
    }
    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ error: 'El ID de usuario no tiene un formato válido' });
    }
    next();
};

const validateCommentBody = (req, res, next) => {
    const { text, post, user } = req.body;
    if (!text || typeof text !== 'string' || text.trim() === '') {
        return res.status(400).json({ error: 'El texto del comentario es obligatorio' });
    }
    if (!post) {
        return res.status(400).json({ error: 'El post asociado es obligatorio' });
    }
    if (!mongoose.Types.ObjectId.isValid(post)) {
        return res.status(400).json({ error: 'El ID de post no tiene un formato válido' });
    }
    if (!user) {
        return res.status(400).json({ error: 'El usuario creador es obligatorio' });
    }
    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ error: 'El ID de usuario no tiene un formato válido' });
    }
    next();
};

module.exports = {
    validateExists,
    validateId,
    validateIdParam,
    validateUserBody,
    validatePostBody,
    validateCommentBody
}