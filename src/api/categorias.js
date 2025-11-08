const BASE_URL = "https://jlorenzo.ddns.net/carta_restaurante";
const USUARIO_ID = "0110";

export const getCategorias = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categorias/?usuario_id=${USUARIO_ID}`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error al cargar categorías:", err);
    throw err;
  }
};

export const createCategoria = async (nombre) => {
  try {
    const body = { usuario_id: USUARIO_ID, nombre };
    const res = await fetch(`${BASE_URL}/categorias/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error al crear categoría:", err);
    throw err;
  }
};

export const updateCategoria = async (id, datos) => {
  try {
    const body = { usuario_id: USUARIO_ID, ...datos };
    const res = await fetch(`${BASE_URL}/categorias/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error al actualizar categoría:", err);
    throw err;
  }
};

export const deleteCategoria = async (id) => {
  try {
    const body = { usuario_id: USUARIO_ID };
    const res = await fetch(`${BASE_URL}/categorias/${id}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error al eliminar categoría:", err);
    throw err;
  }
};
