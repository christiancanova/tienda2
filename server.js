import express from "express";
import morgan from "morgan";
import session from "express-session";
import apiRoutes from "./src/routes/apiRoutes.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import 'dotenv/config'
import './src/db/database.js';
import './src/passport/local.js';

import cluster from "cluster"; // es propia de node para hacer multiples procesos
import os from "os"; // es propia de node para obtener informacion del sistema
import indexRoutes from "./src/routes/indexRoutes.js";
//const app = express();


import parseArgs from 'yargs/yargs'

const yargs = parseArgs(process.argv.slice(2))
console.log(yargs.argv);




const args = yargs
  .alias({ m: "MODOS", p: "port", d: "debug" })
  .default({ m: "fork", p: 8080, d: false }).argv;

const MODO = args.MODOS;
const PORT = args.port;
const nroCPUs = os.cpus().length;

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

if (cluster.isPrimary && MODO === "cluster") {
    console.log(
        `🧮 Primary PID ${process.pid} is running. On port ${PORT}. 🧑‍💻 MODO: ${MODO}.`
    );
    for (let i = 0; i < nroCPUs; i++) {
        cluster.fork(); // crea un proceso por cada cpu disponible
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use(session(
        {
            secret: 'secret',
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({
                mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.tgef3ye.mongodb.net/?retryWrites=true&w=majority`,
                ttl: 60 * 10 // 10 minutes
            })
        }
    ));

    app.use(passport.initialize()); // Inicializa passport
    app.use(passport.session()); // Enlaza passport con la sesion

    app.set('views', 'src/views');
    app.set('view engine', 'ejs');


    /** Routes */
    app.use('/', apiRoutes);
    app.use("/", indexRoutes);


    const server = app.listen(PORT, () =>
        console.log(
            `🚀 Server started on port ${PORT}. 
       🧑‍🔧 Worker PID: ${process.pid}. 
       🧑‍💻 MODO: ${MODO}.
        at ${new Date().toLocaleString()}`
        )
    );
    server.on("error", (err) => console.log(err));
}









