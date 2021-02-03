SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- user categories 
INSERT INTO `motorzone_db`.`user_categories` (id, name) VALUES (1, 'admin');
INSERT INTO `motorzone_db`.`user_categories` (id, name) VALUES (2, 'user');


-- users
INSERT INTO `motorzone_db`.`users`( id, first_name, last_name, email, password, profile_image, category_id) VALUES (1, 'prueba','admin','admin@prueba.com','$2a$10$BJJ8/4l.opQC6QOBwufZHOnoHryxnjPAqV9IBaQQgOvH3PZ7HC0Om','/images/users/default.png',1);
INSERT INTO `motorzone_db`.`users`( id, first_name, last_name, email, password, profile_image, category_id) VALUES (2,'prueba','user','user@prueba.com','$2a$10$vHDDGYQtnaAntBHYsoEb8eUesI.5ZdTV74f.b2JoxU5ffRVdbPaw6','/images/users/default.png',2);
INSERT INTO `motorzone_db`.`users`( id, first_name, last_name, email, password, profile_image, category_id) VALUES (3,'Lautaro','porlan','l.porlann@gmail.com','$2a$10$WEkKlKZtHhBWXJa7NVnO1eqGTz9o66s/Vraqu2F5JlmBLBhm8fSK6','/images/users/default.png',2);

-- colors
INSERT INTO `motorzone_db`.`colors`( id, name) VALUES (1, 'white');
INSERT INTO `motorzone_db`.`colors`( id, name) VALUES (2, 'black');
INSERT INTO `motorzone_db`.`colors`( id, name) VALUES (3, 'red');
INSERT INTO `motorzone_db`.`colors`( id, name) VALUES (4, 'blue');
INSERT INTO `motorzone_db`.`colors`( id, name) VALUES (5, 'green');
INSERT INTO `motorzone_db`.`colors`( id, name) VALUES (6, 'purple');
INSERT INTO `motorzone_db`.`colors`( id, name) VALUES (7, 'grey');
INSERT INTO `motorzone_db`.`colors`( id, name) VALUES (8, 'lightblue');

-- brands
INSERT INTO `motorzone_db`.`brands`( id, name) VALUES (1, 'Honda');
INSERT INTO `motorzone_db`.`brands`( id, name) VALUES (2, 'Benelli');
INSERT INTO `motorzone_db`.`brands`( id, name) VALUES (3, 'Harley-Davidson');
INSERT INTO `motorzone_db`.`brands`( id, name) VALUES (4, 'BMW');
INSERT INTO `motorzone_db`.`brands`( id, name) VALUES (5, 'Yamaha');
INSERT INTO `motorzone_db`.`brands`( id, name) VALUES (6, 'Kawasaki');

-- product_categories
INSERT INTO `motorzone_db`.`product_categories`( id, name) VALUES (1, 'Naked');
INSERT INTO `motorzone_db`.`product_categories`( id, name) VALUES (2, 'Motocross');
INSERT INTO `motorzone_db`.`product_categories`( id, name) VALUES (3, 'Scooter');
INSERT INTO `motorzone_db`.`product_categories`( id, name) VALUES (4, 'Casco');
INSERT INTO `motorzone_db`.`product_categories`( id, name) VALUES (5, 'Accesorios');

-- products
INSERT INTO `motorzone_db`.`products`( id, name, description, year, base_price, discount, final_price, category_id, brand_id) VALUES (1 , "Benelli TNT 150" , 
"Exelente motocicleta de la marca italiana, ideal para el uso del dia a dia. El motor es a prueba de balas,  lo que significa que obtendrá años de confiable uso. El chasis es robusto, además, y ofrece un fácil manejo y suspensiones suaves, justo lo que necesitan los nuevos conductores. Cuenta con un tanque de 16lts ,el motor se alimenta por carburador, posee 14HP y 11NM de torque a 8500rpm",
2019 , 178000 , 15, 151300 , 1 , 2);
INSERT INTO `motorzone_db`.`products`( id, name, description, year, base_price, discount, final_price, category_id, brand_id) VALUES (2 , "Benelli TNT 300" , 
"La TNT 300 está pensada eminentemente para la ciudad, por ello tiene un motor acorde. Este bicilíndrico en línea de 4 tiempos y 300 cc con 8 válvulas y refrigeración líquida es más que eso, pues declara una potencia máxima de 38 CV a 12,000 rpm y ofrece un rendimiento extraordinario, tanto en ciudad como en carretera, donde se aprecia que el nivel de vibración es mínimo. ",
2020 , 750000 , 0, 750000 , 1 , 2);
INSERT INTO `motorzone_db`.`products`( id, name, description, year, base_price, discount, final_price, category_id, brand_id) VALUES (3 , "Honda Titan 150" , 
"La nueva CG 150 Titan suma más equipamiento como su nuevo tablero 100% digital de óptima visibilidad , nuevas llantas de aleación y neumáticos sin cámara que impide que se desinflen rápidamente, ante una posible pinchadura. En esta versión la CG 150 Titán presenta 5 velocidades, un potente motor OHC de 4 tiempos y 150 cm3 y nuevo freno a disco delantero. ",
2020 , 284800 , 0, 284800 , 1 , 1);

-- images
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (1,'benelli-tnt-150-blanco.png', 1,1);
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (2, 'benelli-tnt-150-verde.png', 1,5);
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (3, 'benelli-tnt-150-rojo.png', 1,3);
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (4, 'benelli-tnt-150-negro.png', 1,2);
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (5, 'benelli-tnt-300-blanco.png', 2,1);
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (6, 'benelli-tnt-300-verde.png', 2,5);
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (7, 'benelli-tnt-300-rojo.png', 2,3);
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (8, 'benelli-tnt-300-negro.png', 2,2);
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (9, 'honda-titan-150-blanco.jpg', 3,1);
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (10, 'honda-titan-150-negro.jpg', 3,2);
INSERT INTO `motorzone_db`.`images`( id, image, product_id, color_id) VALUES (11, 'honda-titan-150-rojo.jpg', 3,3);



