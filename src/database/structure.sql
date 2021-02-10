-- MySQL Script generated by MySQL Workbench
-- Wed Feb 10 17:56:20 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema motorzone_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `motorzone_db` ;

-- -----------------------------------------------------
-- Schema motorzone_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `motorzone_db` DEFAULT CHARACTER SET utf8 ;
USE `motorzone_db` ;

-- -----------------------------------------------------
-- Table `motorzone_db`.`product_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motorzone_db`.`product_categories` ;

CREATE TABLE IF NOT EXISTS `motorzone_db`.`product_categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_copy1_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `motorzone_db`.`brands`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motorzone_db`.`brands` ;

CREATE TABLE IF NOT EXISTS `motorzone_db`.`brands` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `motorzone_db`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motorzone_db`.`products` ;

CREATE TABLE IF NOT EXISTS `motorzone_db`.`products` (
  `id` BIGINT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `year` INT NULL,
  `base_price` DECIMAL NULL,
  `discount` INT NULL,
  `final_price` DECIMAL NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `category_id` BIGINT NULL,
  `brand_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `category_id_idx` (`category_id` ASC) ,
  INDEX `brand_id_idx` (`brand_id` ASC) ,
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `motorzone_db`.`product_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `brand_id`
    FOREIGN KEY (`brand_id`)
    REFERENCES `motorzone_db`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `motorzone_db`.`user_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motorzone_db`.`user_categories` ;

CREATE TABLE IF NOT EXISTS `motorzone_db`.`user_categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `motorzone_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motorzone_db`.`users` ;

CREATE TABLE IF NOT EXISTS `motorzone_db`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `profile_image` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `category_id` BIGINT NULL DEFAULT 2,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `category_id_idx` (`category_id` ASC) ,
  CONSTRAINT `user_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `motorzone_db`.`user_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `motorzone_db`.`colors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motorzone_db`.`colors` ;

CREATE TABLE IF NOT EXISTS `motorzone_db`.`colors` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `name` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `motorzone_db`.`images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motorzone_db`.`images` ;

CREATE TABLE IF NOT EXISTS `motorzone_db`.`images` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `image` VARCHAR(100) NULL,
  `product_id` BIGINT NULL,
  `color_id` BIGINT NULL,
  INDEX `product_id_idx` (`product_id` ASC) ,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `color_id_idx` (`color_id` ASC) ,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `motorzone_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `color_id`
    FOREIGN KEY (`color_id`)
    REFERENCES `motorzone_db`.`colors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `motorzone_db`.`carts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motorzone_db`.`carts` ;

CREATE TABLE IF NOT EXISTS `motorzone_db`.`carts` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `total` DECIMAL NULL,
  `user_id` BIGINT NULL,
  `status` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `user_id_idx` (`user_id` ASC) ,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `motorzone_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `motorzone_db`.`cart_product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motorzone_db`.`cart_product` ;

CREATE TABLE IF NOT EXISTS `motorzone_db`.`cart_product` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `deleted_at` TIMESTAMP NULL,
  `cart_id` BIGINT NULL,
  `product_id` BIGINT NULL,
  `subtotal` DECIMAL NULL,
  `units` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `product_id_idx` (`product_id` ASC) ,
  INDEX `sale_id_idx` (`cart_id` ASC) ,
  CONSTRAINT `cart_id`
    FOREIGN KEY (`cart_id`)
    REFERENCES `motorzone_db`.`carts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cart_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `motorzone_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
