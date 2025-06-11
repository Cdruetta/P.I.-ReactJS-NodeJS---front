import React, { useState, useEffect } from 'react';
import ProductsView from './ProductsView';

const API_URL = 'http://localhost:3000/productos'; 

const ProductsContainer = () => {
    const [formData, setFormData] = useState({ nombre: "", precio: "", categoria: "" });
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Datos recibidos del back:", data);  // <--- acá
        setProducts(data.data);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
    };

    const onCreate = async () => {
        try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        fetchProducts();
        setFormData({ nombre: "", precio: "", categoria: "" });
        } catch (error) {
        console.error("Error creating product:", error);
        }
    };

    const onUpdate = async () => {
        try {
        await fetch(`${API_URL}/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        fetchProducts();
        setEditingId(null);
        setFormData({ nombre: "", precio: "", categoria: "" });
        } catch (error) {
        console.error("Error updating product:", error);
        }
    };

    const onDelete = async (id) => {
        try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchProducts();
        } catch (error) {
        console.error("Error deleting product:", error);
        }
    };

    const onChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const onEdit = (product) => {
        setFormData({
        nombre: product.nombre,
        precio: product.precio,
        categoria: product.categoria,
        });
        setEditingId(product.id);
    };

    return (
        <ProductsView
        products={products}
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

export default ProductsContainer;
