const BASE_URL = "https://jlorenzo.ddns.net/carta_restaurante";
const USUARIO_ID = "0110";

export const getProductosPorCategoria = async (categoriaId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/productos/${categoriaId}?usuario_id=${USUARIO_ID}`
    );
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(`Error al obtener productos de la categoría ${categoriaId}:`, err);
    throw err;
  }
};

export const createProducto = async (categoriaId, producto) => {
  try {
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

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error al crear producto:", err);
    throw err;
  }
};

export const updateProducto = async (id, datos) => {
  try {
    const body = { usuario_id: USUARIO_ID, ...datos };
    const res = await fetch(`${BASE_URL}/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    throw err;
  }
};

export const deleteProducto = async (id) => {
  try {
    const body = { usuario_id: USUARIO_ID };
    const res = await fetch(`${BASE_URL}/productos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    throw err;
  }
};
