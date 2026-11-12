document.addEventListener("DOMContentLoaded", () => {
    cargarLibrosPrestados();
});

async function cargarLibrosPrestados() {
    try {
        const respuesta = await fetch("http://localhost:3000/detalleprestamo", {
            method: "GET",
            credentials: "include"
        });

        if (!respuesta.ok) throw new Error("No se pudieron cargar los datos");

        const listaDetalles = await respuesta.json();

        const prestamosActivos = listaDetalles.filter(detalle => {
            const estado = (detalle.prestamo?.estado || detalle.estado || "").toLowerCase().trim();
            return estado === "aprobado" || estado === "prestado" || estado === "aceptado";
        });

        dibujarTabla(prestamosActivos);

    } catch (error) {
        console.error("Error al obtener los préstamos:", error);
        document.getElementById("cuerpoTablaActivos").innerHTML = 
            `<tr><td colspan="5" style="text-align: center; color: red;">Error al cargar los datos</td></tr>`;
    }
}

function dibujarTabla(detalles) {
    const cuerpoTabla = document.getElementById("cuerpoTablaActivos");
    cuerpoTabla.innerHTML = "";

    if (detalles.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="5" style="text-align: center;">No hay libros prestados en este momento.</td></tr>`;
        return;
    }

    detalles.forEach(detalle => {
        const idDetalle = detalle.id;
        const tituloLibro = detalle.libro ? detalle.libro.titulo : "Libro desconocido";
        const nombreEstudiante = detalle.usuario ? detalle.usuario.nombre : "Estudiante desconocido";
        
        const fechaCruda = detalle.prestamo?.fechaPrestamo;
        const fechaObj = fechaCruda ? new Date(fechaCruda) : null;
        const fechaFormateada = fechaObj ? fechaObj.toLocaleDateString() : "Sin fecha";
        
        // 1. LÓGICA DE DÍAS TRANSCURRIDOS
        let diasTranscurridos = 0;
        let estaExpirando = false;

        if (fechaObj) {
            const hoy = new Date();
            const diferenciaMilisegundos = hoy - fechaObj;
            diasTranscurridos = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
            
            if (diasTranscurridos >= 15) {
                estaExpirando = true;
            }
        }

        const fila = document.createElement("tr");

        // 2. APLICAR CLASE AMARILLA SI PASARON 15 DÍAS
        if (estaExpirando) {
            fila.classList.add("fila-expirando");
        }

        const badgeEstado = estaExpirando 
            ? `<span class="badge-alerta">⚠️ Por Expirar (${diasTranscurridos} días)</span>`
            : `<span class="badge-prestado">✔️ En Préstamo</span>`;

        fila.innerHTML = `
            <td><strong>📘 ${tituloLibro}</strong></td>
            <td>👤 ${nombreEstudiante}</td>
            <td>📅 ${fechaFormateada}</td>
            <td>${badgeEstado}</td>
            <td>
                <button onclick="devolverLibro(${idDetalle})" class="btn-devolver">Devolver Libro</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// 3. FUNCIÓN PARA DEVOLVER EL LIBRO
window.devolverLibro = async (idDetalle) => {
    if (!confirm("¿Confirmas que el estudiante entregó este libro?")) return;

    try {
        const respuesta = await fetch(`http://localhost:3000/detalleprestamo/${idDetalle}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ estado: "Devuelto" }) // Cambia el estado para liberar el libro
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo registrar la devolución");
        }

        alert("✅ El libro ha sido devuelto con éxito.");
        cargarLibrosPrestados(); // Recarga la tabla para que el libro desaparezca de aquí

    } catch (error) {
        console.error("Error al devolver:", error);
        alert("Ocurrió un error al intentar devolver el libro.");
    }
};