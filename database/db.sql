CREATE DATABASE enlaces;

USE enlaces;

CREATE TABLE usuario(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombreusuario VARCHAR(16) NOT NULL,
    contrasenia VARCHAR(60) NOT NULL,
    nombrecompleto VARCHAR(100) NOT NULL
);
 DESCRIBE usuario;

 CREATE TABLE enlaces (
     id INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
     titulo VARCHAR(150) NOT NULL,
     url VARCHAR(255) NOT NULL,
     descripcion TEXT,
     user_id INT (11),
     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES usuario(id)
 );

DESCRIBE enlaces;