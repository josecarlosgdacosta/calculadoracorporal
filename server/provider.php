<?php
/**
 * Created by PhpStorm.
 * User: jose.costa
 * Date: 28/06/2016
 * Time: 12:01
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

require_once ("validation.php");

class Provider
{
    private $_connection;
    private $_return;

    public function __construct()
    {
        $this->_connection = new \PDO("mysql:host=localhost;dbname=calculadoracorporal", "root", "", array(
            \PDO::ATTR_PERSISTENT,
            \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"
        ));
    }

    public function getAtletas()
    {
        $query = "SELECT * FROM `calculadoracorporal`.`usuario` u ORDER BY u.`id_usuario` DESC;";
        $statement = $this->_connection->prepare($query);
        $statement->execute();
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getAtleta($idUsuario)
    {
        $idUsuario = (int)$idUsuario;
        $query = "SELECT * FROM `calculadoracorporal`.`usuario` u WHERE u.`id_usuario` = :idUsuario;";
        $statement = $this->_connection->prepare($query);
        $statement->bindParam(":idUsuario", $idUsuario, \PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function saveAtleta(\stdClass $newAtleta)
    {
        try {

            $this->_return = array();

            $objAtletaCasting = (array)$newAtleta;
            array_walk($objAtletaCasting, function($v, $i) {
                if (empty($v)) {
                    $this->_return["success"] = false;
                    $this->_return["message"] = "Nem todas as informações necessárias foram fornecidas.";
                    $this->_return["data"] = null;
                    echo json_encode($this->_return);
                }
            });

            $query = "INSERT INTO
                        `calculadoracorporal`.`usuario`
                      VALUES
                        (:idUsuario, :nomeUsuario, :cpfUsuario, :emailUsuario, :sexoUsuario, :dataNascUsuario, :statusUsuario);";

            $statement = $this->_connection->prepare($query);

            $idUsuario = "NULL";
            $statusUsuario = "A";

            $statement->bindParam(":idUsuario", $idUsuario, \PDO::PARAM_NULL);
            $statement->bindParam(":nomeUsuario", $newAtleta->nome_usuario, \PDO::PARAM_STR);
            $statement->bindParam(":cpfUsuario", $newAtleta->cpf_usuario, \PDO::PARAM_STR);
            $statement->bindParam(":emailUsuario", $newAtleta->email_usuario, \PDO::PARAM_STR);
            $statement->bindParam(":sexoUsuario", $newAtleta->sexo_usuario, \PDO::PARAM_STR);
            $statement->bindParam(":dataNascUsuario", $newAtleta->data_nascimento_usuario, \PDO::PARAM_STR);
            $statement->bindParam(":statusUsuario", $statusUsuario, \PDO::PARAM_STR);

            if ($statement->execute()) {
                $this->_return["success"] = true;
                $this->_return["message"] = "Informações gravadas com sucesso.";
                $this->_return["data"] = $this->_connection->lastInsertId();
                echo json_encode($this->_return);
            } else {
                $this->_return["success"] = false;
                $this->_return["message"] = "Houve um erro no banco de dados. Código: " . $statement->errorInfo()[1] . ".";
                $this->_return["data"] = $this->_connection->lastInsertId();
                echo json_encode($this->_return);
            }

        } catch (\PDOException $pdoE) {
            throw $pdoE;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function deleteAtleta ($post)
    {
        try {
            if (ctype_digit($post->id_usuario)) {
                $idUsuario = (int)$post->id_usuario;
                $query = "DELETE FROM `calculadoracorporal`.`usuario` WHERE `id_usuario` = :idUsuario;";

                $statement = $this->_connection->prepare($query);
                $statement->bindParam(":idUsuario", $idUsuario, \PDO::PARAM_INT);

                if ($statement->execute()) {
                    $this->_return["success"] = true;
                    $this->_return["message"] = "O usuário de nome {$post->nome_usuario} foi removido com sucesso.";
                    echo json_encode($this->_return);
                } else {
                    $this->_return["success"] = false;
                    $this->_return["message"] = "Houve um erro no banco de dados. Código: " . $statement->errorInfo()[1] . ".";
                    echo json_encode($this->_return);
                }
            }
        } catch (\PDOException $pdoE) {
            throw $pdoE;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}

$post = json_decode(file_get_contents("php://input"));

$provider = new Provider();

if ($post) {

    if (isset($post->action) && $post->action === "save") {
        $provider->saveAtleta($post);
    } elseif (isset($post->action) && $post->action === "update") {
        var_dump($post);exit;
    } elseif (isset($post->action) && $post->action === "delete") {
        $provider->deleteAtleta($post);
    }

} else {
    if (!empty($_GET)) {
        echo json_encode($provider->getAtleta($_GET["idUsuario"]));
    } else {
        echo json_encode($provider->getAtletas());
    }
}

