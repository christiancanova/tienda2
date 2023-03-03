import { Router } from "express";
import { fork } from "child_process";
import os from "os"; // es propia de node para obtener informacion del sistema
const nroCPUs = os.cpus().length;
const router = Router();
import compression from "compression";
import logger from "../utils/logger.js";
import getRandom from "../utils/getRandom.js";

const info = {
  "Node version": process.version,
  Platform: process.platform,
  "Directorio de ejecución": process.cwd(),
  "ID del proceso": process.pid,
  "Uso de la memoria": process.memoryUsage(),
  "Memoria total reservada (rss)": process.memoryUsage().rss,
  "path de ejecución": process.execPath, //donde está el ejecutable de node
  "Argumentos de entrada": process.argv,
  CPUs: nroCPUs,
};

router.get("/info", (req, res) => {
  logger.info("🔸Route: /info 🔸Method: GET ");
  console.log(info);
  res.send(info);
});

router.get("/info-gzip", compression(), (req, res) => {
  logger.info("🔸Route: /info-gzip 🔸Method: GET ");
  res.send(info);
});
router.get("/api/randoms", (req, res) => {
  logger.info("🔸Route: /api/randoms 🔸Method: GET ");
  //tests: http://localhost:8080/api/randoms?cant=1000
  // const cant = req.query.cant || 1000;
  if (!req.query.cant) {
    logger.error(
      "🔸Route: /api/randoms 🔸Method: GET 🔸Error: cantidad no especificada"
    );
    res.status(400).send("Debe indicar la cantidad de números a generar");
  } else {
    const cant = 1000;
    const randoms = getRandom(cant);
    console.log(randoms);
    res.send(randoms);
  }
});
router.get("*", compression(), (req, res) => {
  logger.warn("🔸Route: 404 Not Found 🔸Method: GET ");
  res.send("Sorry 🤷‍♂️ 404 Not Found");
});

export default router;
