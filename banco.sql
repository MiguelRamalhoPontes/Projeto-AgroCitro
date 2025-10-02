-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para agricultura
CREATE DATABASE IF NOT EXISTS `agricultura` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `agricultura`;

-- Copiando estrutura para tabela agricultura.colheita
CREATE TABLE IF NOT EXISTS `colheita` (
  `ID_Colheita` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Plantio` int(11) NOT NULL,
  `Data_Colheita` date NOT NULL,
  `Quantidade_Colhida` int(11) NOT NULL,
  `Qualidade` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID_Colheita`),
  KEY `ID_Plantio` (`ID_Plantio`),
  CONSTRAINT `colheita_ibfk_1` FOREIGN KEY (`ID_Plantio`) REFERENCES `plantio` (`ID_Plantio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela agricultura.colheita: ~1 rows (aproximadamente)
INSERT INTO `colheita` (`ID_Colheita`, `ID_Plantio`, `Data_Colheita`, `Quantidade_Colhida`, `Qualidade`) VALUES
	(6, 4, '5062-02-22', 400, 'Boa');

-- Copiando estrutura para tabela agricultura.irrigacao
CREATE TABLE IF NOT EXISTS `irrigacao` (
  `ID_Irrigacao` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Plantio` int(11) NOT NULL,
  `Horario_Inicial` time NOT NULL,
  `Horario_Final` time NOT NULL,
  PRIMARY KEY (`ID_Irrigacao`),
  KEY `ID_Plantio` (`ID_Plantio`),
  CONSTRAINT `irrigacao_ibfk_1` FOREIGN KEY (`ID_Plantio`) REFERENCES `plantio` (`ID_Plantio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela agricultura.irrigacao: ~2 rows (aproximadamente)
INSERT INTO `irrigacao` (`ID_Irrigacao`, `ID_Plantio`, `Horario_Inicial`, `Horario_Final`) VALUES
	(1, 2, '12:33:00', '16:40:00'),
	(6, 5, '08:59:00', '05:55:00');

-- Copiando estrutura para tabela agricultura.plantio
CREATE TABLE IF NOT EXISTS `plantio` (
  `ID_Plantio` int(11) NOT NULL AUTO_INCREMENT,
  `Variedade` varchar(50) NOT NULL,
  `Data_Plantio` date NOT NULL,
  `Quantidade_Plantada` int(11) NOT NULL,
  `Localizacao` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID_Plantio`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela agricultura.plantio: ~7 rows (aproximadamente)
INSERT INTO `plantio` (`ID_Plantio`, `Variedade`, `Data_Plantio`, `Quantidade_Plantada`, `Localizacao`) VALUES
	(1, 'Natal', '2025-10-02', 8888, 'Setor Y'),
	(2, 'Pera', '2025-10-16', 5555, 'Setor H'),
	(3, 'Pera', '2025-10-05', 9999, 'Setor H'),
	(4, 'Valência', '2025-10-22', 555, 'Setor I'),
	(5, 'Bahia', '2025-10-16', 555, 'Setor I'),
	(6, 'Valência', '2025-10-25', 98746, 'Setor H'),
	(7, 'Bahia', '2058-12-08', 9752, 'Setor Z');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
