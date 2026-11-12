import {
    servicioCrearDetallePrestamo,
    servicioLeerDetallePrestamo,
    servicioActualizarDetallePrestamo,
    servicioEliminarDetallePrestamo
} from "../services/detallePrestamo.services.js";

export const crearDetallePrestamo = async (req, res) => {
    try {
        const nuevoDetalle = await servicioCrearDetallePrestamo(req.body);
        res.status(201).json(nuevoDetalle);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}

export const leerDetallePrestamo = async (req, res) => {
    try {
        const detalles = await servicioLeerDetallePrestamo();
        res.status(200).json(detalles);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}

export const actualizarDetallePrestamo = async (req, res) => {
    try {
        const { id } = req.params;
        const prestamoActualizado = await servicioActualizarDetallePrestamo(id, req.body);
        
        res.status(200).json({ 
            mensaje: "Estado del préstamo actualizado con éxito", 
            prestamo: prestamoActualizado 
        });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}

export const eliminarDetallePrestamo = async (req, res) => {
    try {
        const { id } = req.params;
        await servicioEliminarDetallePrestamo(id);
        
        res.status(200).json({ mensaje: "Detalle de préstamo eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
}