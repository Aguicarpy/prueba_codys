const { execSync } = require('child_process');

//Script para crear su base de datos y la tabla correspondiente al formulario
try {
  execSync('"C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe" -h localhost -u root -p123456 < createDb.sql');
  console.log('Base de datos y tabla creadas exitosamente.');
} catch (error) {
  console.error('Error al crear la base de datos y la tabla:', error);
}
