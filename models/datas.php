<?php 


function verifUsername()
{
    $encodedData = file_get_contents("php://input");
    $pseudo = json_decode($encodedData, true); //pour accéder au pseudo, $pseudo['username']

    $db = dbConnect();
    $query = $db->prepare("SELECT * FROM users WHERE username = ?");
    $query->execute([$pseudo['username']]);
    $result = $query->fetchAll();

    if(empty($result)){
        $exist = false;
    }
    else {
        $exist = true;
    }
    return [
        'username' => $pseudo,
        'exist' => $exist
    ];
}

function insertScore()
{
    $canInsert = true;
    $msg_return = false;
    $encodedData = file_get_contents("php://input");
    $data = json_decode($encodedData, true); 

    $db = dbConnect();

    if($data['exist']){
        $canInsert = false;
        //requête select et comparer score
        $query = $db->prepare('SELECT * FROM users WHERE username = ?');
        $result = $query->execute([ $data['username']]);
        if($result) $user_data = $query->fetch();
        if($data['score'] > $user_data['score']){
            $query = $db->prepare("UPDATE users SET score = ? , timer = ? , max_lvl = ? WHERE username = ?");
            $result = $query->execute([
                $data['score'],
                $data['timer'],
                $data['level'],
                $data['username']
            ]);
            if($result) $msg_return = true;
        }
    }
    if($canInsert){
        $query = $db->prepare("INSERT INTO users (username, timer, score, max_lvl) VALUES (? , ? , ? , ?)");
        $result = $query->execute([
            $data['username'],
            $data['timer'],
            $data['score'],
            $data['level']
    ]);
    if($result) $msg_return = true;
    }
    return ['success' => $msg_return];
}

function getBestScore()
{
    $db = dbConnect();
    $query = $db->query("SELECT * FROM users ORDER BY score DESC LIMIT 10 ");
    $result = $query->fetchAll();
    return $result;
}




