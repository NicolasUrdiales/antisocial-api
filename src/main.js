const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ override: true });

const app = express();
const PORT = process.env.PORT ?? '3000';
const { connectToDataBase } = require('./db/mongodb');


const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const tagRoutes = require('./routes/tag.routes');
const postImageRoutes = require('./routes/postImage.routes');

app.use(express.json());

// 2. Conectar las rutas a Express
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/tags', tagRoutes);
app.use('/postImages', postImageRoutes);

app.listen(PORT, async (err) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    await connectToDataBase();
});