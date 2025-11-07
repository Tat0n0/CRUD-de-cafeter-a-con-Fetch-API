# CAMPER CAFÉ - Sistema de Gestión de Carta Digital

Sistema de gestión de carta digital desarrollado en React 19.1 que permite administrar categorías y productos de un café mediante operaciones CRUD completas con persistencia en base de datos real a través de API REST.

---

## Descripción

Aplicación web que permite:

- Crear, leer, actualizar y eliminar categorías
- Crear, leer, actualizar y eliminar productos por categoría
- Edición de elementos
- Confirmación de eliminación con palabra clave "ELIMINAR"
- Persistencia real en base de datos PostgreSQL

---

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)
- Conexión a Internet

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Tat0n0/CRUD-de-cafeter-a-con-Fetch-API
cd camper-cafe

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build
```

---

## Estructura del Proyecto

```
camper-cafe/
├── src/
│   ├── api/
│   │   ├── categorias.js        # CRUD de categorías
│   │   └── productos.js         # CRUD de productos
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── MenuSection/
│   │   │   ├── MenuSection.jsx
│   │   │   └── MenuSection.css
│   │   ├── MenuItem/
│   │   │   ├── MenuItem.jsx
│   │   │   └── MenuItem.css
│   │   └── Footer/
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   ├── App.jsx                  # Componente principal
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

---

## Configuración de la API

### Base URL y Usuario

```javascript
const BASE_URL = "https://jlorenzo.ddns.net/carta_restaurante";
const USUARIO_ID = "0110";
```

### Endpoints - Categorías

```
GET    /categorias/?usuario_id=0110          # Obtener todas las categorías
POST   /categorias/                          # Crear categoría
PUT    /categorias/{id}/                     # Actualizar categoría
DELETE /categorias/{id}/                     # Eliminar categoría
```

### Endpoints - Productos

```
GET    /productos/{categoria_id}?usuario_id=0110    # Obtener productos de una categoría
POST   /productos/{categoria_id}                    # Crear producto
PUT    /productos/{id}                              # Actualizar producto
DELETE /productos/{id}                              # Eliminar producto
```

---

## CRUD Completo

### READ - Leer Datos

**Obtener categorías:**

```javascript
export const getCategorias = async () => {
  const res = await fetch(`${BASE_URL}/categorias/?usuario_id=${USUARIO_ID}`);
  const data = await res.json();
  return data.data;
};
```

**Obtener productos por categoría:**

```javascript
export const getProductosPorCategoria = async (categoriaId) => {
  const res = await fetch(
    `${BASE_URL}/productos/${categoriaId}?usuario_id=${USUARIO_ID}`
  );
  const data = await res.json();
  return data.data;
};
```

**Uso en App.jsx:**

```javascript
useEffect(() => {
  cargarMenu();
}, []);

const cargarMenu = async () => {
  const categorias = await getCategorias();
  const productosPorCategoria = await Promise.all(
    categorias.map((cat) => getProductosPorCategoria(cat.id))
  );
  // Combinar y actualizar estado
};
```

---

### CREATE - Crear Elementos

**Crear categoría:**

```javascript
export const createCategoria = async (nombre) => {
  const body = { usuario_id: USUARIO_ID, nombre };
  const res = await fetch(`${BASE_URL}/categorias/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
};
```

**Request:**

```json
POST /categorias/
{
  "usuario_id": "0110",
  "nombre": "Postres"
}
```

**Crear producto:**

```javascript
export const createProducto = async (categoriaId, producto) => {
  const body = {
    usuario_id: USUARIO_ID,
    ...producto,
    orden: 1,
  };
  const res = await fetch(`${BASE_URL}/productos/${categoriaId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
};
```

**Request:**

```json
POST /productos/3
{
  "usuario_id": "0110",
  "nombre": "Tarta de Chocolate",
  "precio": 4.50,
  "orden": 1
}
```

**Uso en App.jsx:**

```javascript
const addCategory = async (e) => {
  e.preventDefault();
  if (!nuevaCategoria.trim()) return;
  await createCategoria(nuevaCategoria);
  setNuevaCategoria("");
  cargarMenu();
};

const addProduct = async (catId, datos) => {
  await createProducto(catId, datos);
  cargarMenu();
};
```

---

### UPDATE - Actualizar Elementos

**Actualizar categoría:**

```javascript
export const updateCategoria = async (id, datos) => {
  const body = { usuario_id: USUARIO_ID, ...datos };
  const res = await fetch(`${BASE_URL}/categorias/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
};
```

**Request:**

```json
PUT /categorias/5/
{
  "usuario_id": "0110",
  "nombre": "Bebidas Especiales",
  "icono": "https://img.icons8.com/..."
}
```

**Actualizar producto:**

```javascript
export const updateProducto = async (id, datos) => {
  const body = { usuario_id: USUARIO_ID, ...datos };
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
};
```

**Request:**

```json
PUT /productos/15
{
  "usuario_id": "0110",
  "nombre": "Café Latte Premium",
  "precio": 4.00
}
```

**Uso en App.jsx:**

```javascript
const editCategory = async (id, nombre, icono) => {
  await updateCategoria(id, { nombre, icono });
  cargarMenu();
};

const editProduct = async (prodId, nombre, precio) => {
  await updateProducto(prodId, { nombre, precio });
  cargarMenu();
};
```

---

### DELETE - Eliminar Elementos

**Eliminar categoría:**

```javascript
export const deleteCategoria = async (id) => {
  const body = { usuario_id: USUARIO_ID };
  const res = await fetch(`${BASE_URL}/categorias/${id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
};
```

**Request:**

```json
DELETE /categorias/5/
{
  "usuario_id": "0110"
}
```

**Eliminar producto:**

```javascript
export const deleteProducto = async (id) => {
  const body = { usuario_id: USUARIO_ID };
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
};
```

**Request:**

```json
DELETE /productos/15
{
  "usuario_id": "0110"
}
```

**Uso en App.jsx con confirmación:**

```javascript
const deleteCategory = async (id) => {
  const cat = menu.find((c) => c.id === id);
  const confirmar = prompt(
    `Para eliminar la categoría "${cat.name}" escribe ELIMINAR`
  );
  if (confirmar !== "ELIMINAR") return;
  await deleteCategoria(id);
  cargarMenu();
};

const deleteProd = async (prodId) => {
  const confirmar = prompt(`Para eliminar el producto escribe ELIMINAR`);
  if (confirmar !== "ELIMINAR") return;
  await deleteProducto(prodId);
  cargarMenu();
};
```

---

## Componentes Principales

### App.jsx

Componente principal que gestiona el estado global y coordina todas las operaciones CRUD.

**Estados:**

```javascript
const [menu, setMenu] = useState([]);
const [nuevaCategoria, setNuevaCategoria] = useState("");
```

**Funciones principales:**

- `cargarMenu()` - Carga inicial de datos
- `addCategory()` - Crear categoría
- `deleteCategory()` - Eliminar categoría
- `editCategory()` - Actualizar categoría
- `addProduct()` - Crear producto
- `deleteProd()` - Eliminar producto
- `editProduct()` - Actualizar producto

---

### MenuSection.jsx

Representa una categoría completa con sus productos.

**Props:**

- `id` - ID de la categoría
- `name` - Nombre de la categoría
- `iconUrl` - URL del icono
- `items` - Array de productos
- `onDeleteCategory` - Callback eliminar categoría
- `onEditCategory` - Callback editar categoría
- `onAddProduct` - Callback añadir producto
- `onDeleteProduct` - Callback eliminar producto
- `onUpdateProduct` - Callback editar producto

**Características:**

- Edición inline de nombre e icono
- Formulario integrado para añadir productos
- Lista de productos renderizada

---

### MenuItem.jsx

Representa un producto individual.

**Props:**

- `id` - ID del producto
- `name` - Nombre del producto
- `price` - Precio del producto
- `onDelete` - Callback eliminar
- `onEdit` - Callback editar

**Características:**

- Edición inline de nombre y precio
- Precio formateado con 2 decimales y símbolo euro
- Botones de editar y eliminar

---

### Header.jsx

Cabecera de la aplicación que muestra título y subtítulo.

---

### Footer.jsx

Pie de página con enlace a sitio web y dirección.

---

## Formato de Respuestas API

**Éxito:**

```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Cafés Calientes",
      "icono": "https://...",
      "usuario_id": "0110"
    }
  ]
}
```

**Error:**

```json
{
  "error": "Descripción del error",
  "status": 400
}
```

---

## Características Principales

- React 19.1 con Hooks (useState, useEffect)
- Vite como build tool
- CSS modular por componente
- Edición inline sin modales
- Sistema de confirmación para eliminaciones
- Manejo de errores con try-catch
- Carga asíncrona de datos
- Actualización automática del estado

---

## Uso Ejemplo

### Crear una categoría

1. Escribe el nombre en el campo "Nombre nueva categoría"
2. Haz clic en "Nueva Categoría"
3. La categoría aparece en el menú

### Agregar un producto

1. En la sección de la categoría, completa el formulario inferior
2. Escribe nombre y precio
3. Haz clic en "Nuevo"
4. El producto aparece en la lista

### Editar un elemento

1. Haz clic en el icono de editar (lápiz)
2. Modifica los campos
3. Haz clic en "Guardar" o "Cancelar"

### Eliminar un elemento

1. Haz clic en el icono de eliminar (papelera)
2. Escribe "ELIMINAR" en el prompt
3. El elemento desaparece

---

## Manejo de Errores

Todas las operaciones CRUD incluyen manejo de errores:

```javascript
try {
  await createCategoria(nuevaCategoria);
  cargarMenu();
} catch {
  alert("No se pudo crear la categoría");
}
```

Los errores se capturan y se muestran alertas al usuario.

---

## Autor

Aridane Quevedo Cabrera,

- GitHub: @Tat0n0
- Email: aridanequevedocabrera@alumno.ieselrincon.es

---
