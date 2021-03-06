<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PacMan</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/css?family=VT323&display=swap" rel="stylesheet">
</head>
<body>
<div class="centered-block">
    <img src="assets/img/logo_pacman.png" alt="logo pacman">
    <img src="assets/img/pacman_and_ghosts.png" alt="pacman ghosts">
    <form action="" method="POST">
        <div class="input-block">
        <h1>ENTER USERNAME</h1>
        <input type="text" name="inputName" minlength="2" maxlength="8">
        </div>
        <div class="button-block">
            <button type="submit" name="button_submit">START</button>
        </div>
    </form>

</div>
<div class="game-block">
    <div class="map">
        <img src="assets/img/pacman.gif" alt="Pacman">
        <img src="assets/img/redghost.png" alt="redGhost">
        <img src="assets/img/orangeghost.png" alt="orangeGhost">
        <img src="assets/img/blueghost.png" alt="blueGhost">
        <img src="assets/img/background.svg" alt="Background">
    </div>
    <div class="score_timer">
        <h1>Score</h1>
        <div class="blueSquare" id="score"> </div>
        <h1>Timer</h1>
        <div class="blueSquare" id="timer"> </div>
        <h1>Niveau</h1>
        <div class="blueSquare" id="niveau"> </div>
    </div>
</div>
<div class="endGame">
    <div class="game-over blueSquare">
        <h1>GAME OVER</h1>
        <button id="end-button">Cliquez pour continuer...</button>
    </div>
</div>
<div class="tableScore">
    <img src="assets/img/logo_pacman.png" alt="logo pacman">
    <a href="index.php" id="newGame"><div class="blueSquare">NEW GAME</div></a>
</div>

    <script src="assets/js/main.js"></script> <!-- Script à charger après que le DOM soit chargé -->
</body>
</html>