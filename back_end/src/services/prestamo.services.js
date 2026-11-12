import { leerPrestamo } from "../repository/prestamo.repository.js";
import { crearPrestamo } from "../repository/prestamo.repository.js";
import { actualizarPrestamo } from "../repository/prestamo.repository.js";
import { eliminarPrestamo } from "../repository/prestamo.repository.js";

export const servicioCrearPrestamo = (PrestamoData) => {
    return crearPrestamo(PrestamoData);
}

export const servicioLeerPrestamo = async () => {
    return await prisma.prestamo.findMany({
        include: {
            usuario: true, // Trae los datos del estudiante
            detallePrestamo: {
                include: {
                    libro: true // Trae los datos del libro conectado
                }
            }
        }
    });
};

export const servicioActualizarPrestamo = (PrestamoId, PrestamoData) => {
    return actualizarPrestamo(PrestamoId, PrestamoData);
}

export const servicioEliminarPrestamo = (PrestamoId) => {
    return eliminarPrestamo(PrestamoId);
}

