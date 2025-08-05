import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ ...payload, token });
        }
    },[]);

    const login = async (Credential) => {
        try {
            const response = await axios.post('http://localhost:3000/login', Credential);
            const token = response.data.token;
            localStorage.setItem('token', token);
            
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ ...payload, token });
            toast.success('¡Login exitoso!');
            navigate('/');
        } catch (error) { 
            console.error(error);
            toast.error('Usuario o contraseña incorrectos');
        }
    };

    const register = async (useData) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/register', useData);
            if (response.status === 201){
                toast.success('Usuario creado con éxito');
                navigate('/login');
            } else {
                toast.error(response.data.message || 'Error al registrar usuario');
            }
        } catch (error) {
            toast.error('Hubo un error al crear el usuario');
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.info('Sesión cerrada');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}        
        </AuthContext.Provider>
    );
}
