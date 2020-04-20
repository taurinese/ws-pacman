<?php

if(isset($_GET['p'])):
    switch ($_GET['p']):
        case 'game' :
            require 'controllers/gameController.php';
            break;

        default :
            require 'controllers/gameController.php';
    endswitch;
else:
    require 'controllers/gameController.php';
endif;