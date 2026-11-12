import { Router } from "express";

import {
    crearPrestamo,
    leerPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
} from "../controller/prestamo.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verificarToken, crearPrestamo);

router.get("/", verificarToken, leerPrestamo);

router.put("/:id", verificarToken, actualizarPrestamo);

router.delete("/:id", verificarToken, eliminarPrestamo);

export default router;

