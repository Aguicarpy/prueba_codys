Instrucciones para montar el proyecto

-----------------Backend (Nest):-----------------

*Instalacion de dependencias:
cd server
npm install

*Ejecución back:
npm run startdev


-----------------Frontend (Vite):-----------------

*Instalacion de dependencias:
cd client
npm install

*Ejecución front:
npm run dev

-----------------Script para la creación de la base de datos(MySQL)-----------------

*Modificar el path al ejecutable de mysql de su sistema

const { execSync } = require('child_process');
try {
  execSync('"PATH_DE_MYSQL_EN_SU_SISTEMA" -h localhost -u root -p123456 < createDb.sql');
  console.log('Base de datos y tabla creadas exitosamente.');
} catch (error) {
  console.error('Error al crear la base de datos y la tabla:', error);
}

*Ejemplo: "C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe".
*Obs: con las comillas incluidas

*Luego ejecutar el siguiente comando en el directorio --> server/migration ===> comando -->
node createDbScript.js