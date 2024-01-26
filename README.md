Instrucciones para montar el proyecto

-----------------Backend (Nest)-----------------

*Instalacion de dependencias:
cd server
npm install

*Ejecución back:
npm run start:dev


-----------------Script para la creación de la base de datos(MySQL)-----------------
*Vaya al directorio server/migration/createDbScript.js
*Modificar el path al ejecutable de mysql de su sistema(mysql.exe)
*Modificar con las configuraciones de su mysql(-h host, -u username, -p password)

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


-----------------Frontend (Vite)-----------------

*Instalacion de dependencias:
cd client
npm install

*Ejecución front:
npm run dev

En esta etapa ya deberia visualizar la vista del formulario
