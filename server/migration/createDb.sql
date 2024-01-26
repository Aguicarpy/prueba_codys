CREATE DATABASE IF NOT EXISTS form_codys;
USE form_codys;

CREATE TABLE IF NOT EXISTS formulario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile VARCHAR(255)
  fullname VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  birthday DATE,
);