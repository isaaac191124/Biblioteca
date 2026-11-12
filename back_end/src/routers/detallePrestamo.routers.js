import { Router } from "express";
import {
    crearDetallePrestamo,
    leerDetallePrestamo,
    actualizarDetallePrestamo, // <--- Asegúrate de importarla
    eliminarDetallePrestamo
} from "../controller/detallePrestamo.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verificarToken, crearDetallePrestamo);
router.get("/", verificarToken, leerDetallePrestamo);
router.put("/:id", verificarToken, actualizarDetallePrestamo); // <--- Asegúrate de tener esta línea
router.delete("/:id", verificarToken, eliminarDetallePrestamo);

export default router;  