import { Router } from "express";

import {
    crearAutor,
    leerAutor,
    actualizarAutor,
    eliminarAutor
} from "../controller/autor.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verificarToken, crearAutor);

router.get("/", verificarToken, leerAutor);

router.put("/:id",verificarToken ,actualizarAutor);

router.delete("/:id",verificarToken , eliminarAutor);

export default router;

