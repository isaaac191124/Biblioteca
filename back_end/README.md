# Backend - Biblioteca Isaac

API REST (Express + Prisma + PostgreSQL) para la gestión de una biblioteca:
usuarios, autores, editoriales, libros, categorías, préstamos y roles.

## Requisitos

- Node.js
- Una base de datos PostgreSQL (por ejemplo, Neon)

## Configuración

1. Instalar dependencias:

   ```
   npm install
   ```

2. Copiar `.env.example` a `.env` y completar los valores reales
   (`DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).

3. Aplicar las migraciones:

   ```
   npx prisma migrate deploy
   ```

4. Poblar los roles (`admin`, `bibliotecario`, `usuario`) y crear el usuario
   admin inicial (usa `ADMIN_EMAIL`/`ADMIN_PASSWORD` del `.env`):

   ```
   npm run seed
   ```

## Ejecutar

```
npm start        # producción
npm run dev      # desarrollo, con nodemon
```

El servidor queda escuchando en `http://localhost:3000`.

## Autenticación

- `POST /auth/register` — registro público. Siempre crea el usuario con rol
  `usuario` (no se puede auto-asignar `admin`).
- `POST /auth/login` — devuelve el JWT en el body y lo setea además como
  cookie httpOnly `token`.
- `GET /auth/me` — datos del usuario autenticado (requiere sesión).
- `POST /auth/logout` — invalida el token en la base de datos y limpia la
  cookie (requiere sesión).

El resto de rutas acepta el token vía cookie `token` o header
`Authorization: Bearer <token>`.

## Rutas protegidas (requieren rol `admin`)

`usuario`, `autor`, `categoria`, `editorial`, `libro`, `libroCategoria`,
`prestamo`, `detallePrestamo`, `roles` — CRUD completo (GET/POST/PUT/DELETE)
solo para usuarios con rol `admin`. El rol `bibliotecario` existe en el
modelo de datos pero todavía no tiene permisos especiales asignados.
