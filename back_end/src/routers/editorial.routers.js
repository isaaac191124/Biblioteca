import { Router } from "express";

import {
    crearEditorial,
    leerEditorial,
    actualizarEditorial,
    eliminarEditorial
} from "../controller/editorial.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verificarToken, crearEditorial);

router.get("/", verificarToken, leerEditorial);

router.put("/:id", verificarToken, actualizarEditorial);

router.delete("/:id", verificarToken, eliminarEditorial);

export default router;

