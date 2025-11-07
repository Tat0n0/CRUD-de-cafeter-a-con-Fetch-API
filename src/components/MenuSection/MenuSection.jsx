import React, { useState } from "react";
import "./MenuSection.css";
import MenuItem from "../MenuItem/MenuItem.jsx";

export default function MenuSection({
  id,
  name,
  iconUrl,
  items,
  onDeleteCategory,
  onEditCategory,
  onAddProduct,
  onDeleteProduct,
  onUpdateProduct,
}) {
  const [editando, setEditando] = useState(false);
  const [nombreEditado, setNombreEditado] = useState(name);
  const [iconoEditado, setIconoEditado] = useState(iconUrl);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");

  const guardarCambios = () => {
    onEditCategory(id, nombreEditado, iconoEditado);
    setEditando(false);
  };

  const añadirProducto = (e) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoPrecio) {
      alert("Completa el nombre y el precio del producto");
      return;
    }
    onAddProduct(id, {
      nombre: nuevoNombre,
      precio: parseFloat(nuevoPrecio),
    });
    setNuevoNombre("");
    setNuevoPrecio("");
  };

  return (
    <section className="menu-section">
      <div className="section-header">
        {editando ? (
          <>
            <input
              type="text"
              value={nombreEditado}
              onChange={(e) => setNombreEditado(e.target.value)}
              className="category-edit-input"
            />
            <button onClick={guardarCambios} className="add-btn-small">
              Guardar
            </button>
            <button
              onClick={() => setEditando(false)}
              className="add-btn-small cancel"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <h2 className="section-title">{name}</h2>
            <img src={iconUrl} alt="" className="section-icon" />
            <div className="category-actions">
              <button
                className="icon-btn"
                title="Editar categoría"
                onClick={() => setEditando(true)}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/4a1f1a/pencil.png"
                  alt="Editar"
                  className="icon"
                />
              </button>
              <button
                className="icon-btn"
                title="Eliminar categoría"
                onClick={() => onDeleteCategory(id)}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/4a1f1a/trash.png"
                  alt="Eliminar"
                  className="icon"
                />
              </button>
            </div>
          </>
        )}
      </div>

      <ul className="items-list">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            onDelete={onDeleteProduct}
            onEdit={onUpdateProduct}
          />
        ))}
        {items.length === 0 && (
          <li className="empty-products">No hay productos todavía.</li>
        )}
      </ul>

      <form className="add-product-form" onSubmit={añadirProducto}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          step="0.01"
          value={nuevoPrecio}
          onChange={(e) => setNuevoPrecio(e.target.value)}
        />
        <button type="submit" className="add-btn-small">
          Nuevo
        </button>
      </form>
    </section>
  );
}
