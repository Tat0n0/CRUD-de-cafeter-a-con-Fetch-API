import React, { useState } from "react";
import "./MenuItem.css";

export default function MenuItem({ id, name, price, onDelete, onEdit }) {
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState(name);
  const [precio, setPrecio] = useState(price);

  const guardarCambios = () => {
    onEdit(id, nombre, parseFloat(precio));
    setEditando(false);
  };

  return (
    <li className="item">
      {editando ? (
        <div className="item-edit-form">
          <input
            type="text"
            className="item-edit-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            className="item-edit-input price"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <button className="add-btn-small" onClick={guardarCambios}>
            Guardar
          </button>
          <button
            className="add-btn-small cancel"
            onClick={() => setEditando(false)}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <>
          <span className="item-name">{name}</span>
          <span className="item-price">{price.toFixed(2)}€</span>
          <div className="item-actions">
            <button
              className="icon-btn"
              onClick={() => setEditando(true)}
              title="Editar producto"
            >
              <img
                src="https://img.icons8.com/ios-glyphs/30/4a1f1a/pencil.png"
                alt="Editar"
                className="icon"
              />
            </button>
            <button
              className="icon-btn"
              onClick={() => onDelete(id)}
              title="Eliminar producto"
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
    </li>
  );
}
