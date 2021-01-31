INSERT INTO `motorzone_db`.`user_categories` (id, category) VALUES (1, 'admin')
INSERT INTO `motorzone_db`.`user_categories` (id, category) VALUES (2, 'user')

INSERT INTO `motorzone_db`.`users`( id, first_name, last_name, email, password, profile_image, category_id) VALUES (1, 'prueba','admin','admin@prueba.com','$2a$10$BJJ8/4l.opQC6QOBwufZHOnoHryxnjPAqV9IBaQQgOvH3PZ7HC0Om','/images/users/default.png',1);
INSERT INTO `motorzone_db`.`users`( id, first_name, last_name, email, password, profile_image, category_id) VALUES (2,'prueba','user','user@prueba.com','$2a$10$vHDDGYQtnaAntBHYsoEb8eUesI.5ZdTV74f.b2JoxU5ffRVdbPaw6','/images/users/default.png',2);
INSERT INTO `motorzone_db`.`users`( id, first_name, last_name, email, password, profile_image, category_id) VALUES (3,'Lautaro','porlan','l.porlann@gmail.com','$2a$10$WEkKlKZtHhBWXJa7NVnO1eqGTz9o66s/Vraqu2F5JlmBLBhm8fSK6','/images/users/default.png',2);

