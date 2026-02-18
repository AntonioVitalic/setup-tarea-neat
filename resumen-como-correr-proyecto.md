
**1) Instalar dependencias**
- `npm install`
- `cd frontend`
- `npm install --legacy-peer-deps`
- `npm install ajv@^8.0.0 --legacy-peer-deps`
- `cd ..`

**2) Configuración previa (una sola vez)**
- Crear credenciales de Firebase (service account) en la raíz del proyecto.
- Crear .env con: `PORT=3001`
- En Firestore, usar la base **(default)**.

**3) Cargar datos de prueba**
- `npm run seed`

**4) Levantar backend + frontend**
- `npm run dev`

**5) Verificar**
- Web: `http://localhost:3000`
- API adopciones: `http://localhost:3001/api/adoptions/review`
- `http://localhost:3001` mostrando `Cannot GET /` es normal.

Si quieres, también te preparo una versión “copiar/pegar” en bloque único para PowerShell.