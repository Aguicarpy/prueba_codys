import React from 'react';
import './ListForms.css';

//Propiedades esperadas por el componente ListForms
interface ListaComponentProps {
  existingData: any[];          // --> Datos existentes que se mostrarán en la lista
  onEdit: (id: number) => void; // --> Función para manejar la edición de un registro por id
  onDelete: (id: number) => void; // --> Función para manejar la eliminación de un registro por id
}

// Función auxiliar para calcular la edad a partir de la fecha de nacimiento
const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const ListForms: React.FC<ListaComponentProps> = ({ existingData, onEdit, onDelete }) => {
    
  return (
    <div className="list-container">
      {existingData.map((data: any) => (
        <div key={data.id} className="card">
          {data.profile && (
            <div>
              <img
                src={`http://localhost:3000/upload/${data.profile}`}
                alt={`${data.fullname}`}
                className="profile-image"
              />
            </div>
          )}
          <strong>Nombre y Apellido:</strong> {data.fullname}
          <strong>Email:</strong> {data.email}
          <strong>Teléfono:</strong> {data.phone}
          <strong>Fecha de Nacimiento:</strong> {calculateAge(data.birthday)} años
          <div className="button-container">
            <button className="edit-button" onClick={() => onEdit(data.id)}>Editar</button>
            <button className="delete-button" onClick={() => onDelete(data.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListForms;
