<?php 
require'./models/datas.php';

if(!empty($_GET)){
    switch ($_GET['function']) {
        case 'verif_username':
            verifUsername();
            break;
        
        case 'insert_score':
            insertScore();
            break;

        case 'get_best_score':
            getBestScore();
            break; 

        default:
            return false;
            break;
    }
}else {
    include './views/index.php';
}
