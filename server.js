import express  from "express";
import morgan from "morgan";
import session from "express-session";
import apiRoutes from "./src/routes/apiRoutes.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import 'dotenv/config'
import './src/db/database.js';
import './src/passport/local.js';

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

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

/** yargs */

import parseArgs from 'yargs/yargs'

const yargs = parseArgs(process.argv.slice(2))
console.log(yargs.argv);

/** los argumentos 'sueltos' estan dentro de un array
 *  y los argumentos 'key-value' estan dentro de un objeto
 * 
 * ❯ node yargs.js 123 -m dev -p 8080
     { _: [ 123 ], m: 'dev', p: 8080, '$0': 'yargs.js' }
 */

/**Entre el yargs y el .argv puedo agregar alias y valores default */
const args = yargs
  .alias({ m: "mode", p: "port", d: "debug" })
  .default({ m: "dev", p: 8080, d: false }).argv;





const PORT = args;
app.listen(PORT, () => {
    console.log(`Server is running on port ${args.port}`);
    }
);

import { exec } from "child_process";
import { stdout, stderr } from "process";

/**routes */
import indexRoutes from "./src/routes/indexRoutes.js";
app.use("/", indexRoutes);

/** 💡 Métodos del objeto process 
process.exit(); //Cierra el proceso
// documentacion: https://nodejs.org/api/process.html
process.on("exit", () => {
  console.log("Se ha cerrado el proceso");
}); //Se ejecuta cuando el proceso se cierra
process.on("beforeExit", () => {
    console.log("Se va a cerrar el proceso");
});
*/
/** 💡 Métodos de child process */
// exec("ls", (err, stdout, stderr) => {
//   if (err) {
//     console.log(err);
//   }
//   if (stderr) {
//     console.log(stderr);
//   }
//   console.log(stdout);
// });