import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header.jsx";
import MenuSection from "./components/MenuSection/MenuSection.jsx";
import Footer from "./components/Footer/Footer.jsx";
import {
  getCategorias,
  createCategoria,
  deleteCategoria,
  updateCategoria,
} from "./api/categorias.js";
import {
  getProductosPorCategoria,
  createProducto,
  deleteProducto,
  updateProducto,
} from "./api/productos.js";

export default function App() {
  const [menu, setMenu] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const cargarMenu = async () => {
    try {
      const categorias = await getCategorias();
      if (!categorias || categorias.length === 0) {
        setMenu([]);
        return;
      }

      const productosPorCategoria = await Promise.all(
        categorias.map((cat) => getProductosPorCategoria(cat.id))
      );

      const datos = categorias.map((cat, i) => ({
        id: cat.id,
        name: cat.nombre,
        photoURL:
          cat.icono || "https://img.icons8.com/ios-glyphs/50/4a1f1a/meal.png",
        products: (productosPorCategoria[i] || []).map((p) => ({
          id: p.id,
          name: p.nombre,
          price: parseFloat(p.precio),
        })),
      }));

      setMenu(datos);
    } catch (err) {
      alert("Error al cargar el menú");
    }
  };

  useEffect(() => {
    cargarMenu();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!nuevaCategoria.trim()) return;
    try {
      await createCategoria(nuevaCategoria);
      setNuevaCategoria("");
      cargarMenu();
    } catch {
      alert("No se pudo crear la categoría");
    }
  };

  const deleteCategory = async (id) => {
    const cat = menu.find((c) => c.id === id);
    if (!cat) return;
    const confirmar = prompt(
      `Para eliminar la categoría "${cat.name}" escribe ELIMINAR`
    );
    if (confirmar !== "ELIMINAR") return;
    try {
      await deleteCategoria(id);
      cargarMenu();
    } catch {
      alert("No se pudo eliminar la categoría");
    }
  };

  const editCategory = async (id, nombre, icono) => {
    try {
      await updateCategoria(id, { nombre, icono });
      cargarMenu();
    } catch {
      alert("No se pudo actualizar la categoría");
    }
  };

  const addProduct = async (catId, datos) => {
    try {
      await createProducto(catId, datos);
      cargarMenu();
    } catch {
      alert("No se pudo añadir el producto");
    }
  };

  const deleteProd = async (prodId) => {
    const confirmar = prompt(`Para eliminar el producto escribe ELIMINAR`);
    if (confirmar !== "ELIMINAR") return;
    try {
      await deleteProducto(prodId);
      cargarMenu();
    } catch {
      alert("No se pudo eliminar el producto");
    }
  };

  const editProduct = async (prodId, nombre, precio) => {
    try {
      await updateProducto(prodId, { nombre, precio });
      cargarMenu();
    } catch {
      alert("No se pudo editar el producto");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <Header
          title="CAMPER CAFÉ"
          subtitle={`Est. ${new Date().getFullYear()}`}
        />
        <hr />
        <form className="add-category-form" onSubmit={addCategory}>
          <input
            type="text"
            placeholder="Nombre nueva categoría"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            required
          />
          <button type="submit" className="add-btn">
            <img
              src="https://img.icons8.com/ios-glyphs/30/4a1f1a/plus-math.png"
              alt="Añadir"
              className="add-btn-icon"
            />
            <span>Nueva Categoría</span>
          </button>
        </form>
        {menu.length === 0 ? (
          <p>No hay categorías.</p>
        ) : (
          menu.map((cat) => (
            <MenuSection
              key={cat.id}
              id={cat.id}
              name={cat.name}
              iconUrl={cat.photoURL}
              items={cat.products}
              onDeleteCategory={deleteCategory}
              onEditCategory={editCategory}
              onAddProduct={addProduct}
              onDeleteProduct={deleteProd}
              onUpdateProduct={editProduct}
            />
          ))
        )}
        <hr />
        <Footer
          websiteLabel="Visit our website"
          websiteHref="#"
          address="123 Free Code Camp Drive"
        />
      </div>
    </div>
  );
}
