const express = require('express')
const dotenv = require('dotenv')

dotenv.config({override:true})

const app = express()
const PORT = process.env.PORT ?? '3000'
const { connectToDataBase } = require('./db/mongodb')

app.use(express.json())


app.listen(PORT, async(err) => {
    if(err){
        console.error(err.message)
        process.exit(1)
    }
    console.log(`Servidor escuchando en el puerto ${PORT}`)
    await connectToDataBase()

})
