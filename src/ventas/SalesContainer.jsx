import React, { useState, useEffect } from 'react';
import SalesView from './SalesView';

const API_URL = 'http://localhost:3000/ventas';

    const SalesContainer = () => {
    const [sales, setSales] = useState([]);
    const [editingSale, setEditingSale] = useState(null);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Datos recibidos del back:", data);
        setSales(data.data || []);
        } catch (error) {
        console.error("Error al obtener las ventas:", error);
        }
    };

    const handleDeleteSale = async (id) => {
        try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        fetchSales();
        } catch (error) {
        console.error("Error al eliminar venta:", error);
        }
    };

    const handleEditSale = (sale) => {
        setEditingSale(sale);
        // Acá podrías abrir un modal o setear un form para editar
        console.log("Editar venta:", sale);
    };

    return (
        <SalesView
        sales={sales}
        onDelete={handleDeleteSale}
        onEdit={handleEditSale}
        />
    );
};

export default SalesContainer;
