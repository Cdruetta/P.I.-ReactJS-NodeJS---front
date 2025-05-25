import { createContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';

export const UnicornContext = createContext();

export const UnicornProvider = ({ children }) => { 
    const [unicorns, setUnicorns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);

    // URL de la API directamente en el código
    const API_URL = 'http://localhost:3000/usuarios';;

    // Configuración de axios
    const api = axios.create({
        baseURL: API_URL,
        headers: {
        'Content-Type': 'application/json'
        }
    });

    // Interceptor para manejar errores
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

    const getUnicorns = useCallback(async () => {
        setLoading(true);
        try {
        const response = await api.get('/');
        setUnicorns(response.data);
        setError(null);
        } catch (error) {
        setError('Error al cargar unicornios');
        showToast('Error al cargar unicornios', 'error');
        } finally {
        setLoading(false);
        }
    }, [api]);

    const createUnicorn = async (unicorn) => {
        setLoading(true);
        try {
        await api.post('/', unicorn);
        await getUnicorns();
        showToast('Unicornio creado con éxito');
        return true;
        } catch (error) {
        setError('Error al crear usuario');
        showToast('Error al crear usuario', 'error');
        return false;
        } finally {
        setLoading(false);
        }
    };

    const editUnicorn = async (id, unicorn) => {
        setLoading(true);
        try {
        await api.put(`/${id}`, unicorn);
        await getUnicorns();
        showToast('Unicornio actualizado con éxito');
        return true;
        } catch (error) {
        setError('Error al editar unicornio');
        showToast('Error al editar unicornio', 'error');
        return false;
        } finally {
        setLoading(false);
        }
    };

    const deleteUnicorn = async (id) => {
        setLoading(true);
        try {
        await api.delete(`/${id}`);
        await getUnicorns();
        showToast('Unicornio eliminado con éxito');
        return true;
        } catch (error) {
        setError('Error al eliminar unicornio');
        showToast('Error al eliminar unicornio', 'error');
        return false;
        } finally {
        setLoading(false);
        }
    };

    // Carga inicial
    useEffect(() => {
        getUnicorns();
    }, []);

    return (
        <UnicornContext.Provider 
        value={{ 
            unicorns, 
            loading,
            error,
            toast,
            getUnicorns, 
            createUnicorn, 
            editUnicorn, 
            deleteUnicorn,
            showToast
        }}
        >  
        {children} 
        </UnicornContext.Provider>
    );
};