import { useState } from 'react';
import { useContext } from 'react';
import { UnicornContext } from '../context/UnicornContext';

const useUnicornForm = () => {
    const { unicorns, createUnicorn, deleteUnicorn, editUnicorn } = useContext(UnicornContext);

    const [formData, setFormData] = useState({
        name: '',
        color: '',
        age: '',
        power: ''
    });

    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreate = async () => {
        if (!formData.name || !formData.color || !formData.age || !formData.power) return;
        await createUnicorn(formData);
        setFormData({ name: '', color: '', age: '', power: '' });
    };

    const handleEdit = (unicorn) => {
        setFormData({
        name: unicorn.name,  
        color: unicorn.color,
        age: unicorn.age,
        power: unicorn.power
        });
        setEditingId(unicorn._id);
    };

    const handleUpdate = async () => {
        if (!editingId) return;
        await editUnicorn(editingId, formData);
        setFormData({ name: '', color: '', age: '', power: '' });
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        await deleteUnicorn(id);
    };

    return {
        unicorns,
        formData,
        editingId,
        onChange: handleChange,
        onCreate: handleCreate,
        onEdit: handleEdit,
        onUpdate: handleUpdate,
        onDelete: handleDelete
    };
};

export default useUnicornForm;