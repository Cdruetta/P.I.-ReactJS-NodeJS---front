import { useState, useEffect, useCallback } from "react";
import ProductsView from "./ProductsView";
import ProductForm from "./ProductsForm";

const API_URL = "http://localhost:3000/productos";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", precio: "", categoria: "" });
  const [editProduct, setEditProduct] = useState(null);

  // Fetch products memoized para no recrear función innecesariamente
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  // Carga inicial de productos
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Manejo de inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Crear nuevo producto (POST)
  const handleCreate = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          precio: Number(formData.precio),
        }),
      });
      setFormData({ nombre: "", precio: "", categoria: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Cargar producto en formulario para editar
  const handleEdit = (id) => {
    const productToEdit = products.find((p) => p.id === id);
    if (!productToEdit) return;
    setEditProduct(productToEdit);
    setFormData({
      nombre: productToEdit.nombre,
      precio: productToEdit.precio,
      categoria: productToEdit.categoria,
    });
  };

  // Guardar edición (PUT)
  const handleSaveEdit = async () => {
    try {
      await fetch(`${API_URL}/${editProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          precio: Number(formData.precio),
        }),
      });
      setEditProduct(null);
      setFormData({ nombre: "", precio: "", categoria: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Eliminar producto (DELETE)
  const onDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <ProductForm
        formData={formData}
        onChange={handleChange}
        onCreate={handleCreate}
        onSaveEdit={handleSaveEdit}
        isEditing={editProduct !== null}
      />
      <ProductsView products={products} onDelete={onDelete} onEdit={handleEdit} />
    </>
  );
};

export default ProductsPage;
