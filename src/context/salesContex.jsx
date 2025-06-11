import { createContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';

export const SalesContext = createContext();

export const SalesProvider = ({ children }) => { 
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);

    const API_URL = 'http://localhost:3000/ventas';

    const api = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    api.interceptors.response.use(
        response => response,
        error => {
            console.error("Error en la petición:", error);
            throw error;
        }
    );

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    };

    const getSales = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/');
            setSales(response.data.data || []); // Asegura que toma el array correcto
            setError(null);
        } catch (error) {
            setError('Error al cargar ventas');
            showToast('Error al cargar ventas', 'error');
        } finally {
            setLoading(false);
        }
    }, [api]);

    const createSale = async (sale) => {
        setLoading(true);
        try {
            await api.post('/', sale);
            await getSales();
            showToast('Venta creada con éxito');
            return true;
        } catch (error) {
            setError('Error al crear venta');
            showToast('Error al crear venta', 'error');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const editSale = async (id, sale) => {
        setLoading(true);
        try {
            await api.put(`/${id}`, sale);
            await getSales();
            showToast('Venta actualizada con éxito');
            return true;
        } catch (error) {
            setError('Error al editar venta');
            showToast('Error al editar venta', 'error');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteSale = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/${id}`);
            await getSales();
            showToast('Venta eliminada con éxito');
            return true;
        } catch (error) {
            setError('Error al eliminar venta');
            showToast('Error al eliminar venta', 'error');
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSales();
    }, [getSales]);

    return (
        <SalesContext.Provider 
            value={{ 
                sales, 
                loading,
                error,
                toast,
                getSales, 
                createSale, 
                editSale, 
                deleteSale,
                showToast
            }}
        >  
            {children} 
        </SalesContext.Provider>
    );
};
