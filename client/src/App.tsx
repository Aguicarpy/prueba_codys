import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import ListForms from './components/ListForms';

const App: React.FC = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    profile: null as File | null,
    fullname: '',
    email: '',
    phone: 0,
    birthday: new Date().toISOString().split('T')[0],
  });

  // Estado para almacenar los datos existentes
  const [existingData, setExistingData] = useState([]);
  // Estado para almacenar el ID seleccionado para editar
  const [selectedId, setSelectedId] = useState<number | null>(null);

  //cargar los datos existentes al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para obtener datos existentes desde el servidor
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/form');
      
      setExistingData(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  
  // Función para guardar nuevos datos
  const handleSave = async () => {
    try {
      // Crear FormData y agregar cada campo al mismo
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, String(value));
        }
      }
      // Enviar la solicitud POST para guardar
      await axios.post('http://localhost:3000/form', formDataToSend);
      fetchData();
      // Actualizar la lista de datos y limpiar el formulario
      setFormData({
        profile: null,
        fullname: '',
        email: '',
        phone: 0,
        birthday: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  // Función para actualizar datos existentes
  const handleUpdate = async () => {
    try {
      // Crear FormData y agregar cada campo al mismo
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, String(value));
        }
      }
      // Enviar la solicitud PUT para actualizar
      await axios.put(`http://localhost:3000/form/update/${selectedId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchData();
      // Actualizar la lista de datos, limpiar el formulario y deseleccionar el id
      setFormData({
        profile: null,
        fullname: '',
        email: '',
        phone: 0,
        birthday: new Date().toISOString().split('T')[0],
      });
      setSelectedId(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  // Función para manejar la eliminación de datos
  const handleDelete = async (id: number) => {
    try {
      // Enviar solicitud DELETE para eliminar
      await axios.delete(`http://localhost:3000/form/remove/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  // Función para manejar la edición de datos
  const handleEdit = (id: number) => {
    // Encontrar los datos seleccionados para editar
    const selectedData = existingData.find((data: any) => data.id === id);
    
    if (selectedData) {
      // Establecer el id seleccionado y los datos en el formulario
      setSelectedId(id);
      setFormData(selectedData);
    }
  };

  //Renderizado de los componentes correspondiente al Formulario y a la lista de contactos creado
  return (
    <div>
      <Form
        onSave={handleSave}
        onUpdate={handleUpdate}
        selectedId={selectedId} setSelectedId={setSelectedId}
        formData={formData} setFormData={setFormData}
      />
      <ListForms existingData={existingData} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
