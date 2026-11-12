import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import auth from "./routers/auth.routers.js";
import usuario from "./routers/usuario.routers.js";
import autor from "./routers/autor.routers.js";
import categoria from "./routers/categoria.routers.js";
import detallePrestamo from "./routers/detallePrestamo.routers.js";
import editorial from "./routers/editorial.routers.js";
import libro from "./routers/libro.routers.js";
import libroCategoria from "./routers/libroCategoria.routers.js";
import prestamo from "./routers/prestamo.routers.js";
import roles from "./routers/roles.routers.js";
import { verificarToken, requiereRol } from "./middlewares/auth.middleware.js";

const app = express();

// Configuración de CORS para permitir cookies/credenciales
app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"], // Pon los puertos exactos de tu frontend
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // cookieParser debe estar antes de definir cualquier ruta

// Rutas públicas de autenticación (registro/login no requieren sesion)
app.use("/auth", auth);

// Rutas protegidas: requieren sesion iniciada (verificarToken) y rol admin
// (requiereRol) para toda la gestion de la biblioteca.
app.use("/usuario", verificarToken, requiereRol("admin"), usuario);
app.use("/autor", verificarToken, requiereRol("admin"), autor);
app.use("/categoria", verificarToken, requiereRol("admin"), categoria);
app.use("/detallePrestamo", verificarToken, requiereRol("admin"), detallePrestamo);
app.use("/editorial", verificarToken, requiereRol("admin"), editorial);
app.use("/libro", verificarToken, requiereRol("admin"), libro);
app.use("/libroCategoria", verificarToken, requiereRol("admin"), libroCategoria);
app.use("/prestamo", verificarToken, requiereRol("admin"), prestamo);
app.use("/roles", verificarToken, requiereRol("admin"), roles);

export default app;
