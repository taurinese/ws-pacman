<?php 
function dbConnect(){
    try{
    $db = new PDO('mysql:host=localhost;dbname=pacman;charset=utf8', 'root', 'root', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    }
    catch (Exception $exception) //$e contiendra les éventuels messages d’erreur
    {
        die( 'Erreur : ' . $exception->getMessage() );
    }

    return $db;
}

function verifUsername(){
    $pseudo = $_POST['username'];
    $db = dbConnect();
    $query = $db->prepare("SELECT * FROM users WHERE username = ?");
    $query->execute([$pseudo]);
    $result = $query->fetchAll();

    if(empty($result)){
        return json_encode("disponible");
    }
    else {
        return json_encode("non");
    }
}

function insertScore(){
    $db = dbConnect();
    $query = $db->prepare("INSERT INTO users (username, timer, score, max_lvl) VALUES (? , ? , ? , ?)"); // à finir
    $result = $query->execute([
        $_POST['username'],
        $_POST['timer'],
        $_POST['score'],
        $_POST['level']
    ]);
    if($result != false) return true;
    else return false;
}

function getBestScore(){
    $db = dbConnect();
    $query = $db->query("SELECT * FROM users ORDER BY score DESC LIMIT 10 ");
    $result = $query->fetchAll();
    return $result;
}


if(!empty($_GET)){
    switch ($_GET['function']) {
        case 'verif_username':
            verifUsername();
            break;
        
        case 'insert_score':
            insertScore();
            break;

        default:
            return false;
            break;
    }
}

