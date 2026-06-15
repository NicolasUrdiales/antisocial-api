const moongose = require('mongoose')

const MONGO_URL = process.env.MONGO_URI ?? 'mongodb://root:example@localhost:27017/anti-social?authSource=admin'

const connectToDataBase = async() => {
    try{
        await moongose.connect(MONGO_URL)
        console.log("Conexion a Mongo realizada con exito")
    }
    catch (e){
        console.log(e.message)
    }
}

module.exports = {moongose, connectToDataBase}

