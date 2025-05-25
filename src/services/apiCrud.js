const API_URL = "https://crudcrud.com/api/fa6f243821544769b992373e02df8a00/unicorns"; // Reemplaza con tu endpoint

// GET: Obtener todos los unicornios
export const getUnicorns = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

// POST: Crear un unicornio
export const createUnicorn = async (unicorn) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(unicorn),
  });
  return response.json();
};

// PUT/PATCH: Actualizar un unicornio
export const updateUnicorn = async (id, updatedUnicorn) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",  // o "PATCH" para actualización parcial
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUnicorn),
  });
  return response.json();
};

// DELETE: Eliminar un unicornio
export const deleteUnicorn = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};