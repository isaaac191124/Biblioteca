import prisma from "../prisma.js"

export const crearPrestamo = (PrestamoData)=> {
    return prisma.prestamo.create({data: PrestamoData});
}

export const leerPrestamo = ()=> {
    return prisma.prestamo.findMany();
}

export const actualizarPrestamo = (PrestamoId, PrestamoData)=> {
    return prisma.prestamo.update({
        where: {id: PrestamoId},
        data: PrestamoData
    });
}

export const eliminarPrestamo = (PrestamoId)=> {
    return prisma.prestamo.delete({
        where: {id: PrestamoId}
    });
}
