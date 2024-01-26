import React from 'react';
import './Form.css';

interface FormularioComponentProps {
  formData: {
    profile: File | null;
    fullname: string;
    email: string;
    phone: number;
    birthday: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onUpdate: () => void;
  onReset: () => void;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>; 
}

const Form: React.FC<FormularioComponentProps> = ({
  formData,
  onInputChange,
  onFileChange,
  onSave,
  onUpdate,
  onReset,
  selectedId,
  setSelectedId
}) => {

const handleReset = () => {
    onReset();
    setSelectedId(null);
};

  return (
    <div className={`form-container ${selectedId !== null ? 'edit-mode' : 'create-mode'}`}>
      <h2>{selectedId !== null ? 'Editar Registro' : 'Crear Nuevo Registro'}</h2>
      <div>
        <label>Perfil:</label>
        <input type="file" onChange={onFileChange} />
      </div>
      <div>
        <label>Nombre Completo:</label>
        <input type="text" name="fullname" value={formData.fullname} onChange={onInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={onInputChange} />
      </div>
      <div>
        <label>Teléfono:</label>
        <input type="number" name="phone" value={formData.phone} onChange={onInputChange} />
      </div>
      <div>
        <label>Fecha de Nacimiento:</label>
        <input type="date" name="birthday" value={formData.birthday} onChange={onInputChange} />
      </div>
      <div>
        <button onClick={selectedId !== null ? onUpdate : onSave}>
          {selectedId !== null ? 'Actualizar' : 'Guardar'}
        </button>
        {selectedId !== null && (
          <button onClick={handleReset}>Nuevo Registro</button>
        )}
      </div>
    </div>
  );
};

export default Form;
