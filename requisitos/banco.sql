SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `calculadoracorporal` ;
CREATE SCHEMA IF NOT EXISTS `calculadoracorporal` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `calculadoracorporal` ;

-- -----------------------------------------------------
-- Table `calculadoracorporal`.`usuario`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `calculadoracorporal`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT COMMENT 'Chave primária da tabela.' ,
  `nome_usuario` VARCHAR(60) NOT NULL COMMENT 'Coluna que armazena o nome completo do usuário.' ,
  `cpf_usuario` VARCHAR(45) NOT NULL ,
  `email_usuario` VARCHAR(60) NOT NULL ,
  `sexo_usuario` ENUM('M', 'F') NOT NULL COMMENT 'Coluna que armazena o sexo do usuário.' ,
  `data_nascimento_usuario` DATE NOT NULL COMMENT 'Coluna que armazena a data de nascimento do usuário.' ,
  `status_usuario` ENUM('A', 'I') NOT NULL DEFAULT 'A' COMMENT 'Coluna que identifica se o usuário está ativo ou inativo: A (ativo) e I (inativo).' ,
  PRIMARY KEY (`id_usuario`) ,
  UNIQUE INDEX `id_usuario_UNIQUE` (`id_usuario` ASC) ,
  UNIQUE INDEX `cpf_usuario_UNIQUE` (`cpf_usuario` ASC) ,
  UNIQUE INDEX `email_usuario_UNIQUE` (`email_usuario` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calculadoracorporal`.`medida`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `calculadoracorporal`.`medida` (
  `id_medida` INT NOT NULL AUTO_INCREMENT COMMENT 'Chave primária da tabela.' ,
  `id_usuario` INT NOT NULL COMMENT 'Chave estrangeira que vem da tabela \'calculadoracorporal.usuario\'.' ,
  `altura` FLOAT(4,2) NOT NULL COMMENT 'Coluna que armazena a altura do usuário' ,
  `massa_corporal` FLOAT(5,2) NOT NULL COMMENT 'Coluna que armazena a quantidade de massa corporal do usuário em quilogramas (kg).' ,
  `percentual_massa_magra` FLOAT(5,2) NOT NULL COMMENT 'Coluna que armazena o valor percentual de massa magra do usuário.' ,
  `percentual_gordura` FLOAT(5,2) NOT NULL COMMENT 'Coluna que armazena o valor percentual de gordura do usuário.' ,
  `abdomen` FLOAT(5,2) NOT NULL COMMENT 'Coluna que armazena o valor da medida do abdomen do usuário em centímetros.' ,
  `cintura` FLOAT(5,2) NOT NULL COMMENT 'Coluna que armazena o valor da medida da cintura do usuário em centímetros.' ,
  `quadril` FLOAT(5,2) NOT NULL COMMENT 'Coluna que armazena o valor da medida do quadril do usuário em centímetros.' ,
  PRIMARY KEY (`id_medida`) ,
  UNIQUE INDEX `id_medida_UNIQUE` (`id_medida` ASC) ,
  INDEX `fk_medida_usuario_idx` (`id_usuario` ASC) ,
  CONSTRAINT `fk_medida_usuario`
    FOREIGN KEY (`id_usuario` )
    REFERENCES `calculadoracorporal`.`usuario` (`id_usuario` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `calculadoracorporal`.`periodo`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `calculadoracorporal`.`periodo` (
  `id_periodo` INT NOT NULL AUTO_INCREMENT COMMENT 'Chave primária da tabela.' ,
  `id_medida` INT NOT NULL COMMENT 'Chave estrangeira que vem da tabela \'calculadoracorporal.medida\'.' ,
  `data_periodo` DATETIME NOT NULL ,
  PRIMARY KEY (`id_periodo`) ,
  INDEX `fk_periodo_medida1_idx` (`id_medida` ASC) ,
  CONSTRAINT `fk_periodo_medida1`
    FOREIGN KEY (`id_medida` )
    REFERENCES `calculadoracorporal`.`medida` (`id_medida` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `calculadoracorporal` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
