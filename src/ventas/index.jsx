import { useState, useEffect, useCallback } from "react";
import SalesContainer from "./SalesContainer";


const API_URL = "http://localhost:3000/ventas";

const SalesPage = () => {
    const [sales, setSales] = useState([]);
    const [formData, setFormData] = useState({
        usuarioId: "",
        productoId: "",
        cantidad: "",
        total: "",
        fecha: ""
    });
    const [editSale, setEditSale] = useState(null);

    // Traer ventas
    const fetchSales = useCallback(async () => {
        try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setSales(data.data);
        } catch (error) {
        console.error("Error al obtener ventas:", error);
        }
    }, []);

    useEffect(() => {
        fetchSales();
    }, [fetchSales]);

    // Crear venta
    const createSale = async (newSale) => {
        try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(newSale)
        });
        fetchSales();
        } catch (error) {
        console.error("Error al crear venta:", error);
        }
    };

    // Actualizar venta
    const updateSale = async (id, updatedSale) => {
        try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedSale)
        });
        setEditSale(null);
        fetchSales();
        } catch (error) {
        console.error("Error al actualizar venta:", error);
        }
    };

    // Eliminar venta
    const deleteSale = async (id) => {
        try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        fetchSales();
        } catch (error) {
        console.error("Error al eliminar venta:", error);
        }
    };

    // Editar
    const handleEditSale = (sale) => {
        setEditSale(sale);
        setFormData(sale);
    };

    return (
        
        <SalesContainer
            sales={sales}
            onDelete={deleteSale}
            onEdit={handleEditSale}
        />
        
    );
};

export default SalesPage;
