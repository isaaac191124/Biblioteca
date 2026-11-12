import { Router } from "express";

import {
    crearCategoria,
    leerCategoria,
    actualizarCategoria,
    eliminarCategoria
} from "../controller/categoria.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/",verificarToken , crearCategoria);

router.get("/",verificarToken  , leerCategoria);

router.put("/:id",verificarToken  , actualizarCategoria);

router.delete("/:id",verificarToken , eliminarCategoria);

export default router;

