import { Router } from "express";

import {
    crearLibro,
    leerLibro,
    leerLibroPorId, // Importamos la nueva función
    actualizarLibro,
    eliminarLibro
} from "../controller/libro.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verificarToken, crearLibro);

router.get("/", verificarToken, leerLibro);

// NUEVA RUTA AÑADIDA
router.get("/:id", verificarToken, leerLibroPorId);

router.put("/:id", verificarToken, actualizarLibro);

router.delete("/:id", verificarToken, eliminarLibro);

export default router;