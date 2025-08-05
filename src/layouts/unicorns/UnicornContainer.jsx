import React, { useState, useEffect } from 'react';
import UnicornsView from './UnicornsView';

const API_URL = 'http://localhost:3000/usuarios'; // Cambia por tu endpoint real

const UnicornsContainer = () => { 
  // Estado del formulario sin color y poder
  const [formData, setFormData] = useState({ nombre: "", edad: "", email: "" });
  const [unicorns, setUnicorns] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUnicorns();
  }, []);

  const fetchUnicorns = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUnicorns(data.data);
    } catch (error) {
      console.error("Error fetching unicorns:", error);
    }
  };

  const onCreate = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchUnicorns();
      setFormData({ nombre: "", edad: "", email: "" });
    } catch (error) {
      console.error("Error creating usuario:", error);
    }
  };

  const onUpdate = async () => {
    try {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchUnicorns();
      setEditingId(null);
      setFormData({ nombre: "", edad: "", email: "" });
    } catch (error) {
      console.error("Error updating usuario:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchUnicorns();
    } catch (error) {
      console.error("Error deleting usuario:", error);
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onEdit = (unicorn) => {
    setFormData({
      nombre: unicorn.nombre,
      edad: unicorn.edad,
      email: unicorn.email,
    });
    setEditingId(unicorn.id);
  };

  return (
    <UnicornsView
      unicorns={unicorns}
      formData={formData}
      editingId={editingId}
      onChange={onChange}
      onCreate={onCreate}
      onEdit={onEdit}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
};

export default UnicornsContainer;
