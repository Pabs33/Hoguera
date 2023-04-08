DROP DATABASE IF EXISTS HOGUERA;
CREATE DATABASE IF NOT EXISTS HOGUERA;
USE HOGUERA;

-- Tabla familia
DROP TABLE IF EXISTS FAMILIA;
CREATE TABLE FAMILIA (
	IdFamilia INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NombreFamilia VARCHAR (100) NOT NULL UNIQUE);
INSERT INTO FAMILIA VALUES (0, 'HOGUERA'), (0, 'Rafa_Martinez');

-- Tabla administracion
-- Odio las fechas y ahora tengo que ponerlas en formato YYYY-MM-DD

DROP TABLE IF EXISTS ADMINISTRACION;
CREATE TABLE ADMINISTRACION (
	IdSorteo INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    IdFamiliaAdministracion INTEGER NOT NULL,
    FechaSorteo DATE NOT NULL,
    Decimos28 INTEGER,
    Decimos64 INTEGER,
    Papeletas28 INTEGER,
    Papeletas64 INTEGER,
    FOREIGN KEY(IdFamiliaAdministracion) REFERENCES FAMILIA(IdFamilia));
INSERT INTO `ADMINISTRACION` VALUES 
(0, 1, '2022-11-20', 2, 4, 6, 8),
(0, 2, '2022-11-20', 1, 4, 2, 3),
(0, 1, '2022-12-19', 3, 2, 1, 1),
(0, 2, '2022-10-11', 1, 3, 5, 4);

-- Prueba de que funcione :)
SELECT * FROM FAMILIA;

SELECT * FROM FAMILIA WHERE IdFamilia = 1;

SELECT * 
FROM FAMILIA JOIN ADMINISTRACION 
ON FAMILIA.IdFamilia = ADMINISTRACION.IdFamiliaAdministracion
WHERE ADMINISTRACION.FechaSorteo = '2022-11-20' AND FAMILIA.NombreFamilia = 'HOGUERA';

-- Codigo de un update para la API REST 
UPDATE administracion
SET administracion.Decimos28 = 1, administracion.Decimos64 = 1, administracion.Papeletas28 = 1, administracion.Papeletas64 = 1
WHERE ADMINISTRACION.FechaSorteo = '2022-11-20' AND administracion.IdFamiliaAdministracion = 1;

-- Consulta para sacar el resumen de los sorteos

SELECT 	SUM(Decimos28) AS 'TotalDecimos28', SUM(Decimos64) AS 'TotalDecimos64', SUM(Papeletas28) AS 'TotalPapeletas28', SUM(Papeletas64) AS 'TotalPapeletas64'
FROM 	ADMINISTRACION JOIN FAMILIA
ON 		ADMINISTRACION.IdFamiliaAdministracion = FAMILIA.IdFamilia
WHERE	ADMINISTRACION.IdFamiliaAdministracion = 1 AND ADMINISTRACION.FechaSorteo BETWEEN '2022-11-20' AND '2023-02-24';