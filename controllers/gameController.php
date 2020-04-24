<?php 
require'./models/datas.php';

if(!empty($_GET)){
    switch ($_GET['function']) {
        case 'verif_username':
            $result = verifUsername();
            break;
        
        case 'insert_score':
            $result = insertScore();
            break;

        case 'get_best_score':
            $result = getBestScore();
            break; 

        default:
            return false;
            break;
    }
    echo json_encode($result);
}else {
    include './views/index.php';
}
