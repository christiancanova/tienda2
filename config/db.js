import mongoose from "mongoose";
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

const conectarDB = async () =>{
    try{
        const connection = await mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.tgef3ye.mongodb.net/?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        const url = `${connection.connection.host}:${connection.connection.port}`; 
        console.log('Conectada a base de datos con exito')
    }catch(error){
        console.log(error)
        process.exis(1);
    }
}

export default conectarDB;