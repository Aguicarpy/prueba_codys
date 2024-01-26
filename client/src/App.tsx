import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import ListForms from './components/ListForms';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    profile: null as File | null,
    fullname: '',
    email: '',
    phone: 0,
    birthday: new Date().toISOString().split('T')[0],
  });

  const [existingData, setExistingData] = useState([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/form');
      
      setExistingData(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  
  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, String(value));
        }
      }
      await axios.post('http://localhost:3000/form', formDataToSend);
      fetchData();
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

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, String(value));
        }
      }
      await axios.put(`http://localhost:3000/form/update/${selectedId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchData();
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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/form/remove/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profile: file,
    }));
  };


  const handleEdit = (id: number) => {
    const selectedData = existingData.find((data: any) => data.id === id);
    if (selectedData) {
      setSelectedId(id);
      setFormData(selectedData);
    }
  };

  const handleReset = () => {
    setFormData({
      profile: null,
      fullname: '',
      email: '',
      phone: 0,
      birthday: new Date().toISOString().split('T')[0],
    });
  }
  
  return (
    <div>
      <Form
        formData={formData}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSave={handleSave}
        onUpdate={handleUpdate}
        onReset={handleReset}
        selectedId={selectedId} setSelectedId={setSelectedId}
      />
      <ListForms existingData={existingData} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
