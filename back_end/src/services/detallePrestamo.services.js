import { 
    leerDetallePrestamo, 
    crearDetallePrestamo, 
    actualizarDetallePrestamo, 
    eliminarDetallePrestamo 
} from "../repository/detallePrestamo.repository.js";

export const servicioCrearDetallePrestamo = (DetallePrestamoData) => {
    return crearDetallePrestamo(DetallePrestamoData);
}

export const servicioLeerDetallePrestamo = () => {
    return leerDetallePrestamo();
}

export const servicioActualizarDetallePrestamo = (DetallePrestamoId, DetallePrestamoData) => {
    return actualizarDetallePrestamo(DetallePrestamoId, DetallePrestamoData);
}

export const servicioEliminarDetallePrestamo = (DetallePrestamoId) => {
    return eliminarDetallePrestamo(DetallePrestamoId);
}