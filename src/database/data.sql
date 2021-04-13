-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: motorzone_db
-- ------------------------------------------------------
-- Server version	5.6.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,NULL,NULL,NULL,'Honda'),(2,NULL,NULL,NULL,'Benelli'),(3,NULL,NULL,NULL,'Harley-Davidson'),(4,NULL,NULL,NULL,'BMW'),(5,NULL,NULL,NULL,'Yamaha'),(6,NULL,NULL,NULL,'Kawasaki'),(7,'2021-03-04 16:54:20','2021-03-04 16:54:20',NULL,'Halcon'),(8,'2021-03-04 17:00:58','2021-03-04 17:00:58',NULL,'Vertigo'),(9,'2021-03-04 17:01:20','2021-03-04 17:01:20',NULL,'Vega'),(10,'2021-03-04 17:22:13','2021-03-04 17:22:13',NULL,'Punto Extremo'),(11,'2021-03-04 17:22:22','2021-03-04 17:22:22',NULL,'Fox'),(12,'2021-03-04 17:22:33','2021-03-04 17:22:33',NULL,'LS2'),(13,'2021-03-18 18:38:32','2021-03-18 18:38:32',NULL,'Otros'),(14,'2021-04-11 17:35:43','2021-04-11 17:35:43',NULL,'Corven'),(15,'2021-04-11 17:35:48','2021-04-11 17:35:48',NULL,'Zanella');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_product`
--

DROP TABLE IF EXISTS `cart_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sale_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `subtotal` decimal(10,0) DEFAULT NULL,
  `units` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `product_id_idx` (`product_id`),
  KEY `sale_id_idx` (`sale_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sale_id` FOREIGN KEY (`sale_id`) REFERENCES `carts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_product`
--

LOCK TABLES `cart_product` WRITE;
/*!40000 ALTER TABLE `cart_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `total` decimal(10,0) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `status` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,NULL,NULL,NULL,'white'),(2,NULL,NULL,NULL,'black'),(3,NULL,NULL,NULL,'red'),(4,NULL,NULL,NULL,'blue'),(5,NULL,NULL,NULL,'green'),(6,NULL,NULL,NULL,'purple'),(7,NULL,NULL,NULL,'grey'),(8,NULL,NULL,NULL,'lightblue'),(9,'2021-03-04 17:21:57','2021-03-04 17:21:57',NULL,'orange'),(10,'2021-03-04 17:25:25','2021-03-04 17:25:25',NULL,'yellow');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `color_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `product_id_idx` (`product_id`),
  KEY `color_id_idx` (`color_id`),
  CONSTRAINT `color_id` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `image_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,NULL,NULL,NULL,'benelli-tnt-150-blanco.png',1,1),(2,NULL,NULL,NULL,'benelli-tnt-150-verde.png',1,5),(3,NULL,NULL,NULL,'benelli-tnt-150-rojo.png',1,3),(4,NULL,NULL,NULL,'benelli-tnt-150-negro.png',1,2),(5,NULL,NULL,NULL,'benelli-tnt-300-blanco.png',2,1),(6,NULL,NULL,NULL,'benelli-tnt-300-verde.png',2,5),(7,NULL,NULL,NULL,'benelli-tnt-300-rojo.png',2,3),(8,NULL,NULL,NULL,'benelli-tnt-300-negro.png',2,2),(9,NULL,NULL,NULL,'honda-titan-150-blanco.jpg',3,1),(10,NULL,NULL,NULL,'honda-titan-150-negro.jpg',3,2),(11,NULL,NULL,NULL,'honda-titan-150-rojo.jpg',3,3),(12,'2021-03-04 16:56:20','2021-03-04 16:56:20',NULL,'image-1614876980405.jpeg',5,2),(13,'2021-03-04 16:57:44','2021-03-04 16:57:44',NULL,'image-1614877064930.jpeg',5,3),(14,'2021-03-04 16:59:15','2021-03-04 16:59:15',NULL,'image-1614877155794.jpeg',5,1),(15,'2021-03-04 17:02:42','2021-03-04 17:02:42',NULL,'image-1614877362526.jpeg',6,2),(16,'2021-03-04 17:03:03','2021-03-04 17:03:03',NULL,'image-1614877383936.jpeg',6,1),(17,'2021-03-04 17:04:45','2021-03-04 17:04:45',NULL,'image-1614877485703.jpeg',7,2),(18,'2021-03-04 17:06:10','2021-03-04 17:06:10',NULL,'image-1614877570095.jpeg',8,2),(19,'2021-03-04 17:08:48','2021-03-04 17:08:48',NULL,'image-1614877728440.jpeg',9,2),(20,'2021-03-04 17:20:43','2021-03-04 17:20:43',NULL,'image-1614878442891.jpeg',10,4),(21,'2021-03-04 17:20:56','2021-03-04 17:20:56',NULL,'image-1614878456389.jpeg',10,3),(22,'2021-03-04 17:24:28','2021-03-04 17:24:28',NULL,'image-1614878668206.jpeg',11,9),(23,'2021-03-04 17:24:45','2021-03-04 17:24:45',NULL,'image-1614878685428.jpeg',11,3),(24,'2021-03-04 17:24:53','2021-03-04 17:24:53',NULL,'image-1614878693386.jpeg',11,2),(25,'2021-03-04 17:26:57','2021-03-04 17:26:57',NULL,'image-1614878817681.jpeg',12,4),(26,'2021-03-04 17:27:17','2021-03-04 17:27:17',NULL,'image-1614878837237.jpeg',12,10),(27,'2021-03-04 17:27:25','2021-03-04 17:27:25',NULL,'image-1614878845160.jpeg',12,7),(28,'2021-03-04 17:28:42','2021-03-04 17:28:42',NULL,'image-1614878922241.jpeg',13,2),(29,'2021-03-04 17:34:24','2021-03-04 17:34:24',NULL,'image-1614879264371.png',14,1),(30,'2021-03-04 17:34:40','2021-03-04 17:34:40',NULL,'image-1614879279654.jpg',14,2),(31,'2021-03-04 17:34:54','2021-03-04 17:34:54',NULL,'image-1614879294376.png',14,5),(32,'2021-03-04 17:42:41','2021-03-04 17:42:41',NULL,'honda-cb250-twister-rojo.jpeg',15,3),(33,'2021-03-04 17:43:00','2021-03-04 17:43:00',NULL,'image-1614879780371.jpg',15,1),(34,'2021-03-04 17:43:08','2021-03-04 17:43:08',NULL,'image-1614879788354.jpg',15,2),(35,'2021-03-04 17:47:02','2021-03-04 17:47:02',NULL,'image-1614880022920.jpeg',15,7),(36,'2021-03-04 17:50:09','2021-03-04 17:50:09',NULL,'image-1614880209241.jpg',16,3),(37,'2021-03-04 17:50:55','2021-03-04 17:50:55',NULL,'image-1614880255791.jpeg',16,1),(38,'2021-03-04 17:53:20','2021-03-04 17:53:20',NULL,'image-1614880400494.jpg',17,2),(39,'2021-03-04 17:53:39','2021-03-04 17:53:39',NULL,'image-1614880419246.jpg',17,3),(40,'2021-03-04 17:56:21','2021-03-04 17:56:21',NULL,'image-1614880581200.jpg',18,2),(41,'2021-03-18 18:37:07','2021-03-18 18:37:07',NULL,'image-1616092627827.jpeg',19,2),(42,'2021-03-18 18:39:50','2021-03-18 18:39:50',NULL,'image-1616092790884.jpeg',20,2),(43,'2021-04-11 17:39:06','2021-04-11 17:39:06',NULL,'image-1618162746510.jpeg',21,7),(44,'2021-04-11 17:39:25','2021-04-11 17:39:25',NULL,'image-1618162765551.jpeg',21,2),(45,'2021-04-11 17:39:37','2021-04-11 17:39:37',NULL,'image-1618162777993.jpeg',21,8),(46,'2021-04-11 17:44:43','2021-04-11 17:44:43',NULL,'image-1618163083369.jpeg',22,3),(47,'2021-04-11 17:44:52','2021-04-11 17:44:52',NULL,'image-1618163092568.jpeg',22,2),(48,'2021-04-11 17:46:34','2021-04-11 17:46:34',NULL,'image-1618163194397.jpeg',23,1);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_copy1_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES (1,NULL,NULL,NULL,'Naked'),(2,NULL,NULL,NULL,'Motocross'),(3,NULL,NULL,NULL,'Scooter'),(4,NULL,NULL,NULL,'Casco'),(5,NULL,NULL,NULL,'Accesorios');
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `base_price` decimal(10,0) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `final_price` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `brand_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `category_id_idx` (`category_id`),
  KEY `brand_id_idx` (`brand_id`),
  CONSTRAINT `brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Benelli TNT 150','Exelente motocicleta de la marca italiana, ideal para el uso del dia a dia. El motor es a prueba de balas,  lo que significa que obtendrá años de confiable uso. El chasis es robusto, además, y ofrece un fácil manejo y suspensiones suaves, justo lo que necesitan los nuevos conductores. Cuenta con un tanque de 16lts ,el motor se alimenta por carburador, posee 14HP y 11NM de torque a 8500rpm',2019,178000,15,151300,NULL,NULL,NULL,1,2),(2,'Benelli TNT 300','La TNT 300 está pensada eminentemente para la ciudad, por ello tiene un motor acorde. Este bicilíndrico en línea de 4 tiempos y 300 cc con 8 válvulas y refrigeración líquida es más que eso, pues declara una potencia máxima de 38 CV a 12,000 rpm y ofrece un rendimiento extraordinario, tanto en ciudad como en carretera, donde se aprecia que el nivel de vibración es mínimo. ',2020,750000,0,750000,NULL,NULL,NULL,1,2),(3,'Honda Titan 150','La nueva CG 150 Titan suma más equipamiento como su nuevo tablero 100% digital de óptima visibilidad , nuevas llantas de aleación y neumáticos sin cámara que impide que se desinflen rápidamente, ante una posible pinchadura. En esta versión la CG 150 Titán presenta 5 velocidades, un potente motor OHC de 4 tiempos y 150 cm3 y nuevo freno a disco delantero. ',2020,284800,0,284800,NULL,NULL,NULL,1,1),(5,'Casco integral Halcon H57','Este casco integral garantiza la máxima seguridad, ya que cubre desde el mentón hacia la nuca, de manera que la cabeza queda completamente protegida. ¡Sentite seguro en cada kilómetro!\r\n\r\nUn visor que te protege en cada paso\r\nCon su visor simple vas a disfrutar de viajes placenteros y seguros en la moto, ya que protege tu visión de cualquier elemento del ambiente que pueda dañarte.\r\n\r\nVentilación constante\r\nSu ventilación superior, inferior, posterior te aporta frescura en todo momento, ya que p',2021,2500,5,2375,'2021-03-04 16:56:20','2021-03-04 16:56:20',NULL,4,7),(6,'Casco Halcon MX Road','Si sos piloto de motocross o enduro, este casco es para vos. Está especialmente diseñado para este tipo de prácticas, ya que te ofrece mayor confort y seguridad en situaciones exigentes y de alto riesgo.',2021,5000,0,5000,'2021-03-04 17:02:42','2021-03-04 17:02:42',NULL,4,7),(7,'Casco Vega V-FLOW ','El casco V FLOW Helmets de Vega es un casco moderno y lleno de características de última generación.\r\nCARACTERÍSTICAS:\r\nCarcasa de construcción compuesta de ingeniería ligera. Material ABS.\r\nSistema de flujo de aire multicanal con nueve puertos de admisión y escape.\r\nVisera extraíble y ventilada de múltiples posiciones.\r\nAlmohadillas internas extraíbles y lavables.\r\nSistema acolchado de correa de anillo en D.\r\nSoporte de cámara universal incluido.\r\nAprueba la norma ece r 22.05 de Las Naciones Un',2020,10690,5,10156,'2021-03-04 17:04:45','2021-03-04 17:04:45',NULL,4,9),(8,'Casco Vértigo Cosmic','Este casco integral garantiza la máxima seguridad, ya que cubre desde el mentón hacia la nuca, de manera que la cabeza queda completamente protegida. ¡Sentite seguro en cada kilómetro!\r\n\r\nRigidez y seguridad\r\nEstá confeccionado con materiales de primera calidad que absorben la energía y le otorgan gran rigidez. En caso de impacto, te brindará la protección que necesitás al amortiguar el golpe en un solo punto.',2020,2365,0,2365,'2021-03-04 17:06:10','2021-03-04 17:06:10',NULL,4,8),(9,'Casco Vértigo V50','Casco Integral Vertigo V50 Infinity Mate.\r\n\r\nEl nuevo concepto de diseño de Vértigo:\r\nAIRKINETIC. Nuestra naturaleza está en el movimiento.\r\n\r\nVÉRTIGO\r\nUn nuevo comienzo, una nueva historia.',2021,9842,25,7382,'2021-03-04 17:08:48','2021-03-04 17:08:48',NULL,4,8),(10,'Casco Vertigo Basic','CASCO MOTO ABIERTO VERTIGO BASIC V10 - STI MOTOS\r\n\r\nLa emblemática línea Basic de la marca en su versión de finales de 2017 y principios de 2018 se aggiorna con un renovado diseño. Pesado para volver a los fundamentales de la Seguridad.\r\n',2019,2178,5,2069,'2021-03-04 17:20:42','2021-03-04 17:20:42',NULL,4,8),(11,'Guantes P.Ex P32','GUANTE MOTOCROSS PUNTO EXTREMO PB32',2020,1375,0,1375,'2021-03-04 17:24:28','2021-03-04 17:24:28',NULL,5,10),(12,'Guantes Fox Dirtpaw','Guantes Fox Dirtpaw Originales\r\n\r\nRENDIMIENTO INSPIRADO EN MOTO\r\nUn guante de alto rendimiento sin el alto precio. Los guantes Dirtpaw tienen nudillos blindados, palma acolchada y comodidad superior en el punto flexible para seguir siendo la mejor opción para el ciclista principiante. El cierre de aro y bucle proporciona un ajuste seguro, y el estiramiento incorporado le brinda la máxima destreza.\r\n\r\nCARACTERISTICAS\r\nPuño de neopreno moldeado por compresión para un ajuste seguro\r\nPalma Clarino ™',2021,4199,0,4199,'2021-03-04 17:26:57','2021-03-04 17:26:57',NULL,5,11),(13,'Guantes LS2 RAY','GUANTE RAY:\r\nEs un guante ligero ideal para uso urbano, con protecciones en los nudillos, refuerzo en palma para minimizar la abrasión y ajuste de velcro en muñeca para que tengas la mayor comodidad y protección. Además, el touch screen permite que utilices el celular, sin necesidad de quitártelos. Es por este motivo que son los guantes ideales para aquellas personas que pasan mucho tiempo arriba de su moto.',2021,6590,5,6261,'2021-03-04 17:28:42','2021-03-04 17:28:42',NULL,5,12),(14,'Benelli TNT 600','TNT 600 Naked: DEPORTIVA PURA PODEROSA 100% BENELLI!\r\nLa categoría de 600 cc de las motos deportivas es increíblemente popular, cada vez más se prefiere el estilo desnudo y no hay máquina en este sentido más pura y visceral que la de la línea Benelli TNT 600.\r\nY la recién actualizada TNT 600 es nuestro mejor esfuerzo entre los de 600 cc de la clase.\r\nEl poder de la TNT 600 I proviene de nuestro más avanzado motor de cuatro cilindros en línea, con refrigeración líquida, doble árbol de levas en ca',2021,1685000,5,1600750,'2021-03-04 17:34:24','2021-03-04 17:34:24',NULL,1,2),(15,'Honda Cb250 Twister','Tipo de Motor Monocilíndrico, 4 tiempos, 4 válvulas, OHC y refrigerado por aire.\r\nCilindrada 249,58 cc.\r\nEncendido Digital transistorizado con control computarizado.\r\nArranque Eléctrico.\r\nTransmisión 6 velocidades.\r\nFrenos delanteros Disco hidráulico perforado / 276 mm.\r\nFrenos traseros Disco hidráulico perforado / 220 mm.\r\nSuspensión delantera Horquilla telescópica / 117 mm.\r\nSuspensión trasera Basculante de doble brazo con monoamortiguador hidráulico y resorte helicoidal / 108 mm.\r\nNeumático d',2021,588800,0,588800,'2021-03-04 17:42:41','2021-03-04 17:42:41',NULL,1,1),(16,'Honda Xr 150','Motor Monocilíndrico, 4 tiempos, 2 válvulas, OHC y refrigerado por aire\r\nCilindrada 149.15 cm3\r\nRelación de compresión 9.5 : 1\r\nAlimentación Carburador\r\nEncendido DC-CDI (Ignición por descarga capacitiva) y avance electrónico\r\nArranque Eléctrico / Patada\r\nTransmisión 5 velocidades\r\nSuspensión delantera Horquilla telescópica / 160 mm\r\nSuspensión trasera Brazo oscilante / 152 mm con monoamortiguador\r\nFreno delantero A disco hidráulico perforado / 240 mm\r\nFreno trasero A tambor / 110 mm\r\nNeumático ',2020,292800,0,292800,'2021-03-04 17:50:09','2021-03-04 17:50:09',NULL,2,1),(17,'Yamaha Fz 16','Motor Monocilíndrico, 4 tiempos, 2 válvulas, SOHC, refrigerado por aire\r\nCilindrada 149 cc\r\nPotencia máxima 13 cv @ 8.000 rpm\r\nVelocidad máxima 115 km/h\r\nAlimentación Inyección electrónica\r\nEncendido TCI\r\nArranque Eléctrico y pedal\r\nTransmisión 5 velocidades\r\nFaro Delantero Halógeno\r\nLlantas Aleación\r\nFrenos D / T Disco / Tambor\r\nNeumático Delantero 100 / 80 R17\r\nNeumático Trasero 140 / 60 R17\r\nSuspensión Delantera Horquilla telescópica\r\nSuspensión Trasera Monoamortiguador con ajuste en precarga',2020,303700,0,303700,'2021-03-04 17:53:20','2021-03-04 17:53:20',NULL,1,5),(18,'Yamaha Ybr 125','Monocilíndrico, 4T, SOHC, Refrigerado por aire.\r\n\r\nCilindrada: 124 cc\r\n\r\nDiámetro x carrera: 54 x 54 mm\r\n\r\nRelación compresión: 10,0:1\r\n\r\nSistema de Lubricación: Cárter húmedo\r\n\r\nAlimentación: Carburador\r\n\r\nEncendido: CDI\r\n\r\nArranque: Eléctrico\r\n\r\nTransmisión: 5 velocidades\r\n\r\nTransmisión Final: Cadena\r\n\r\nEmbrague: Multidisco en baño de aceite',2019,245000,15,208250,'2021-03-04 17:56:21','2021-03-04 17:56:21',NULL,1,5),(21,'Zanella Styler Exclusive 150','MOTOR\r\n\r\nGYZ 149,6cc OHC 9,4 HP 9,5 Nm\r\nAutomática CVT\r\n\r\nATRIBUTOS\r\n\r\n- ALARMA CON COMANDO REMOTO\r\n- CUBIERTAS VINTAGE DE BANDA BLANCA\r\n- FUNDA CUBRE-MOTO\r\n- ASIENTO DIVIDIDO /SLAMMER\r\n- COMPARTIMENTO BAJO ASIENTO\r\n- ESPACIO PORTAOBJETOS\r\n- PARRILLA REBATIBLE C/CAJA TRASERA\r\n- PARABRISAS REGULABLE\r\n- BATERÍA GEL S/MANTENIMIENTO\r\n- LUCES LED / CONEXIÓN USB',2020,217000,0,217000,'2021-04-11 17:39:06','2021-04-11 17:39:06',NULL,3,15),(22,'Corven Dot 150','MOTOR\r\nTIPO: Monocilindrico 4t y 2 valvulas\r\nREFRIGERACION: Aire\r\nCILINDRADA: 150cc\r\nSISTEMA DE IGNICION: CDI con avance electronico\r\nArranque: Electrico / Patada\r\n\r\nCHASIS\r\nNeumatico delantero : 3.5 - 10 Aleacion\r\nNeumatico trasero: 3.5 - 10 Aleacion\r\nFreno delantero: Disco con caliper de doble piston\r\nFreno trasero: Tambor /\r\nEntrada USB\r\n\r\nDIMENSIONES\r\nCapacidad del tanque: 5 litros\r\nPeso: 93kg',2020,158800,0,158800,'2021-04-11 17:44:43','2021-04-11 17:44:43',NULL,3,14),(23,'Corven Txr 250','Corven TXR 250 L Ficha Técnica\r\nMecánica\r\nMotor Monocilíndrico, 4 tiempos, 2 válvulas, OHV, refrigerado por aire\r\nCilindrada 230 cc\r\nPotencia máxima 16,7 cv @ 7.300 rpm\r\nVelocidad máxima 120 km/h\r\nAlimentación Carburador\r\nEncendido CDI (Ignición por descarga capacitiva)\r\nArranque Eléctrico\r\nTransmisión 6 velocidades',2019,325000,0,325000,'2021-04-11 17:46:34','2021-04-11 17:46:34',NULL,2,14);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_categories`
--

DROP TABLE IF EXISTS `user_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_categories`
--

LOCK TABLES `user_categories` WRITE;
/*!40000 ALTER TABLE `user_categories` DISABLE KEYS */;
INSERT INTO `user_categories` VALUES (1,NULL,NULL,NULL,'admin'),(2,NULL,NULL,NULL,'user');
/*!40000 ALTER TABLE `user_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `user_category_id` FOREIGN KEY (`category_id`) REFERENCES `user_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','MotorbikeZone','motorbikezone007@gmail.com','$2a$10$BW8.o8Bf0Kpx/dQifEx79u5SQ6tS9ntxGc61ybsEM0pF6JxIg3CKK','/images/users/default.png','2021-03-18 17:46:33','2021-03-18 17:46:33',NULL,1),(5,'Cate','Alvaro','calvaro1@meetup.com','$2a$10$CuolOrB7BYwrVDNC5TkAxOKPJvdvD0rxAC0wrUXC59mEd05NCBu4G','/images/users/default.png','2021-03-18 17:55:37','2021-03-18 17:55:37',NULL,2),(6,'Andy','Warrick','awarrick2@woothemes.com','$2a$10$IgH9X/VzDyCD9gDeWmDCBOntF72XIThbZrnQ/fmOKpunnk2kPrp6e','/images/users/default.png','2021-03-18 17:56:31','2021-03-18 17:56:31',NULL,2),(7,'Langston','Micklewicz','lmicklewicz3@etsy.com','$2a$10$d1q/oYU0HIaApNzwyZQP6.KwEfu18kFryMoOEvc3yqlnNLnPB/Pqe','/images/users/default.png','2021-03-18 17:58:41','2021-03-18 17:58:41',NULL,2),(8,'Sandi','Netherclift','snetherclift4@bandcamp.com','$2a$10$SbQTJNRTKublraOHc8nffOdxDjhzdzaR/z8BE09Z78JslEv0XX.Bu','/images/users/default.png','2021-03-18 17:59:07','2021-03-18 17:59:07',NULL,2),(9,'Betteann','Kerins','bkerins5@tinyurl.com','$2a$10$0yDlX.uy5BLhSXeiFAHbiuk.ZFnrI30eM2lbdv.f1y8Igrgabdmg6','/images/users/default.png','2021-03-18 17:59:35','2021-03-18 17:59:35',NULL,2),(10,'Berenice','Blanckley','bblanckley6@gizmodo.com','$2a$10$BqI1ahAhLw5iJbCY5OBfhu9.GGPdJRW8NBjtLgkY.QJwyOWSyobC.','/images/users/default.png','2021-03-18 18:00:16','2021-03-18 18:00:16',NULL,2),(11,'Georgianne','McEniry','gmceniry7@oracle.com','$2a$10$C4z2PD951l0NQw9nB9Rx0.fdnGNeFm4qDTcCo/re8rTeKZhDciUpy','/images/users/default.png','2021-03-18 18:01:00','2021-03-18 18:01:00',NULL,2),(12,'Gannon','Sherrocks','gsherrocks8@cmu.edu','$2a$10$nZhi32KJTdFWY/P9FUQl9exTDawZOmLrOG3ACPw.o90M1yhpHU4m2','/images/users/default.png','2021-03-18 18:01:39','2021-03-18 18:01:39',NULL,2),(13,'Neron','Waltering','nwaltering9@networksolutions.com','$2a$10$fgtSgOExasBPb6hyLcPRXeUIQjnhfgT099/1pdJqMI9RnnXu9vTo6','/images/users/default.png','2021-03-18 18:02:07','2021-03-18 18:02:07',NULL,2),(14,'Lester','Gransden','lgransdena@com.com','$2a$10$1lmqxOFRFQQh8HUhuhP4NOB0TmyCe7N51nMfTxo1s.Y1o5nUOAMQ2','/images/users/default.png','2021-03-18 18:02:32','2021-03-18 18:02:32',NULL,2),(15,'Ingamar','Skowcraft','iskowcraftb@cnbc.com','$2a$10$2WZE.FciJ9Cbmu2edwlnfueE/T.6OBYr8dwaRStn3yCd757ESLVCG','/images/users/default.png','2021-03-18 18:03:05','2021-03-18 18:03:05',NULL,2),(16,'Lazarus','Gusticke','lgustickec@gravatar.com','$2a$10$8S2DdTSrTtGXHqMFtJ2MAeKTBw3VJaQXPVEqerlwIHQgvV64TqCcy','/images/users/default.png','2021-03-18 18:03:34','2021-03-18 18:03:34',NULL,2),(17,'Lou','Elbourne','lelbourned@jiathis.com','$2a$10$usOAVUxZmimrZIPlC5F8veFRYwJTy0oekOUmU0fo2.opB3DosXKQ.','/images/users/default.png','2021-03-18 18:04:33','2021-03-18 18:04:33',NULL,2),(18,'Gwenny','Lionel','glionele@archive.org','$2a$10$HO1hBPKKYgPeJ3zKCAzOxel9iBQ5zeyT7uFex4SAUFArOFnW1gduq','/images/users/default.png','2021-03-18 18:04:56','2021-03-18 18:04:56',NULL,2),(19,'Carolyne','Wyleman','cwylemanf@scribd.com','$2a$10$UsrfD.Nm2OXQteYfiKGmfe3N1juPQkDFvSaa5sy9fo7KN/lkeK04S','/images/users/default.png','2021-03-18 18:05:29','2021-03-18 18:05:29',NULL,2),(20,'Cheryl','Glencrash','cglencrashg@forbes.com','$2a$10$1q16JRjbzYhIUiHxQLx/oeNLiPGycgc2wmvU3wVLwz9aKiBrlBbOm','/images/users/default.png','2021-03-18 18:05:54','2021-03-18 18:05:54',NULL,2),(21,'Petr','Tiltman','ptiltmanh@apache.org','$2a$10$Jd3FfaDWPeNx4hr23t5acuL8xBbXLwegKnciBPD5eiRsyXsYceUA6','/images/users/default.png','2021-03-18 18:06:18','2021-03-18 18:06:18',NULL,2),(22,'Erina','O\'Heffernan','eoheffernani@scientificamerican.com','$2a$10$BMAkeZ3ulVPOwClNigcRI.G2tA0Lp73uVN.0YNt0n5FZm7LxgtvhS','/images/users/default.png','2021-03-18 18:06:44','2021-03-18 18:06:44',NULL,2),(23,'Mateo','Neenan','mneenanj@vkontakte.ru','$2a$10$uuIDYuPR8yq6wGFREKRV9OgIeXG4d8H8i8yakiqgQulz6mfm/b6m2','/images/users/default.png','2021-03-18 18:07:19','2021-03-18 18:07:19',NULL,2),(24,'Moses','Garshore','mgarshorek@nasa.gov','$2a$10$J22DfNfZn//LP5FBV/STWuLt91I6qghUA.20iILHiQyyin2SuNP3G','/images/users/default.png','2021-03-18 18:10:21','2021-03-18 18:10:21',NULL,2),(25,'Tabbatha','Antonognoli','tantonognolil@nydailynews.com','$2a$10$ABTj9XYEKeQdigI8it2dmOZLOlngP4Oz3KMunYcPPFkAlz2VqQP16','/images/users/default.png','2021-03-18 18:13:13','2021-03-18 18:13:13',NULL,2),(26,'Tiffany','Sired','tsiredm@com.com','$2a$10$PIarwq3N4.rt17t9UbPipO1kqLGG9eTweDw3wvVMe1HQNdQYe/tD.','/images/users/default.png','2021-03-18 18:13:52','2021-03-18 18:13:52',NULL,2),(27,'Belita','Samart','bsamartn@unblog.fr','$2a$10$GPPfs43eCTGgyA39mX7oQu.g6mp5ej498GBGkQeRIjdGInS10N0bK','/images/users/default.png','2021-03-18 18:14:20','2021-03-18 18:14:20',NULL,2),(28,'Agnesse','Betchley','abetchleyo@ted.com','$2a$10$0opluek34MyswCU2HzhzxOBeVQ/f2NYyuyJQwzsuqhExuP7IcwmHO','/images/users/default.png','2021-03-18 18:24:03','2021-03-18 18:24:03',NULL,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `views` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `views_product_id_idx` (`product_id`),
  KEY `views_user_id_idx` (`user_id`),
  CONSTRAINT `views_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `views_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
INSERT INTO `views` VALUES (1,1,19,'2021-03-18 18:37:08','2021-03-18 18:37:08',NULL),(2,1,20,'2021-03-18 18:39:51','2021-03-18 18:39:51',NULL),(3,1,19,'2021-03-18 18:40:57','2021-03-18 18:40:57',NULL),(4,1,19,'2021-03-18 18:41:34','2021-03-18 18:41:34',NULL),(5,1,9,'2021-03-18 18:41:42','2021-03-18 18:41:42',NULL),(6,1,10,'2021-03-18 18:41:44','2021-03-18 18:41:44',NULL),(7,1,10,'2021-04-11 17:32:45','2021-04-11 17:32:45',NULL),(8,1,21,'2021-04-11 17:39:06','2021-04-11 17:39:06',NULL),(9,1,21,'2021-04-11 17:39:25','2021-04-11 17:39:25',NULL),(10,1,21,'2021-04-11 17:39:38','2021-04-11 17:39:38',NULL),(11,1,21,'2021-04-11 17:40:05','2021-04-11 17:40:05',NULL),(12,1,22,'2021-04-11 17:44:43','2021-04-11 17:44:43',NULL),(13,1,22,'2021-04-11 17:44:52','2021-04-11 17:44:52',NULL),(14,1,23,'2021-04-11 17:46:34','2021-04-11 17:46:34',NULL);
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-13  9:51:09
