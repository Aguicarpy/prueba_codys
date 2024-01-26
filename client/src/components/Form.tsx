import React from 'react';
import './Form.css';

// Propiedades esperadas por el componente Form
interface FormularioComponentProps {
  formData: {
    profile: File | null;
    fullname: string;
    email: string;
    phone: number;
    birthday: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    profile: File | null;
    fullname: string;
    email: string;
    phone: number;
    birthday: string;
  }>>;
  onSave: () => void;   // --> Función para guardar nuevos registros
  onUpdate: () => void; // --> Función para actualizar registros existentes
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>; 
  
}

//Props pasadas desde App, para utilizar en las funcionalidades del formulario
const Form: React.FC<FormularioComponentProps> = ({
  formData,
  setFormData,
  onSave,
  onUpdate,
  selectedId,
  setSelectedId
}) => {

  //Estado de las validaciones de los campos
  const [dateError, setDateError] = React.useState<string | null>(null);
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [phoneError, setPhoneError] = React.useState<string | null>(null);
  const [fileError, setFileError] = React.useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar cambios en el campo de fecha de nacimiento
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Obtener la fecha actual 
    const currentDate = new Date().toISOString().split('T')[0];
    // Validar si la fecha ingresada no es mayor a la fecha actual
    if (value <= currentDate) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setDateError(null); // Limpiar el mensaje de error si la fecha es válida
    } else {
      // Mostrar mensaje de error al usuario
      setDateError('La fecha de nacimiento no puede ser futura.');
    }
  };

  // Función para manejar cambios en el campo de correo
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (emailRegex.test(value)) {
      setEmailError(null);
    } else {
      setEmailError('Ingrese un correo electrónico válido');
    }
  };

  // Función para manejar cambios en el campo de teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //Regex validador para número de Paraguay
    const isValidPhoneNumber = /^(?:\+595|0)?\s?\d{9}$/.test(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Actualizar el estado de error del teléfono
    setPhoneError(isValidPhoneNumber ? null : 'Número de teléfono inválido');
  };

  // Función para manejar cambios en el campo de archivo (imagen)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
  
    // Verificar la extensión del archivo
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    const fileExtension = file?.name.split('.').pop()?.toLowerCase();
  
    if (fileExtension && allowedExtensions.includes(fileExtension)) {
      setFormData((prevData) => ({
        ...prevData,
        profile: file,
      }));
      setFileError(null); // Limpiar el mensaje de error si la extensión es válida
    } else {
      // Mostrar mensaje de error si la extensión no es válida
      setFileError('La imagen debe ser en formato PNG, JPG, JPEG o GIF');
    }
  };

  
// Función para restablecer el formulario y deseleccionar el ID
const handleReset = () => {
    setFormData({
      profile: formData.profile || null,
      fullname: '',
      email: '',
      phone: 0,
      birthday: new Date().toISOString().split('T')[0],
    });
    setSelectedId(null)
  }

  return (
    <div className={`form-container ${selectedId !== null ? 'edit-mode' : 'create-mode'}`}>
      <h2>{selectedId !== null ? 'Editar Registro' : 'Crear Nuevo Registro'}</h2>
      <div>
        <label>Perfil:</label>
        <input type="file" onChange={handleFileChange} />
        {fileError && <span className="error-message">{fileError}</span>}
      </div>
      <div>
        <label>Nombre y Apellido:</label>
        <input type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleEmailChange} />
        {emailError && <span className="error-message">{emailError}</span>}
      </div>
      <div>
        <label>Teléfono:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handlePhoneChange} />
        {phoneError && <span className="error-message">{phoneError}</span>}
      </div>
      <div>
        <label>Fecha de Nacimiento:</label>
        <input type="date" name="birthday" value={formData.birthday} onChange={handleDateChange} />
        {dateError && <p className="error-message">{dateError}</p>}
      </div>
      <div>
        <button onClick={selectedId !== null ? onUpdate : onSave}
        disabled={dateError !== null || emailError !== null || phoneError !== null || fileError !== null ||
          formData.fullname.trim() === '' ||
          formData.email.trim() === '' ||
          formData.phone === 0}
        >
          {selectedId !== null ? 'Actualizar' : 'Guardar'}
        </button>
        {selectedId !== null && (
          <button onClick={handleReset}>Volver al registro</button>
        )}
      </div>
    </div>
  );
};

export default Form;
