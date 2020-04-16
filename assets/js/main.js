//Variables globales
const pacMan = document.querySelector('img[src="assets/img/pacman.gif"]')
const redGhost = document.querySelector('img[src="assets/img/redghost.png"]')
const orangeGhost = document.querySelector('img[src="assets/img/orangeghost.png"]')
const blueGhost = document.querySelector('img[src="assets/img/blueghost.png"]')
const map = document.querySelector('.map')
const submit = document.querySelector('button[name=button_submit]')
const inputName = document.querySelector('input[type=text]')
const inputBlock = document.querySelector('.input-block')
const divScore = document.querySelector('#score')
const divTimer = document.querySelector('#timer')
const divNiveau = document.querySelector('#niveau')
//const submit = document.querySelector('#button_submit')
const endButton = document.querySelector('#end-button')

//Constante blocs de HTML
const homePage = document.querySelector('.centered-block')
const gamePage = document.querySelector('.game-block')
const scorePage = document.querySelector('.tableScore')
const endGameBlock = document.querySelector('.endGame')

let verifyUsername

let pacManInterval
let redGhostInterval
let orangeGhostInterval
let blueGhostInterval

let pacManPosition
let redGhostPosition
let blueGhostPosition
let orangeGhostPosition

let movePacManInterval = 150
let moveRedGhostInterval = 500
let moveBlueGhostInterval = 500
let moveOrangeGhostInterval = 500

let currentRedGhostDirection
let currentOrangeGhostDirection
let currentBlueGhostDirection

let gameScore = 0
let dotsLeft = 0
let time = 0
let userName

let gameOver
let gameLevel = 1

const directions = [ 'toLeft', 'toRight', 'toTop', 'toBottom' ]

//Responsive

const maxSize = 1000
const mqlMaxWidth = matchMedia(`(max-width: ${maxSize}px)`)
const mqlMaxHeight = matchMedia(`(max-height: ${maxSize}px)`)
const mqlOrientation = matchMedia('(orientation: portrait)')

const sizeUnit = () => {
    let sizeUnit = 'px'
    if (isSmallScreen()) {
        sizeUnit = isPortraitOrientation() ? 'vw' : 'vh'
    }
    return sizeUnit
}
const isSmallScreen = () => {
    const mql = isPortraitOrientation() ? mqlMaxWidth : mqlMaxHeight
    return mql.matches
}
const isPortraitOrientation = () => {
    const mql = mqlOrientation
    return mql.matches
}
const pxToViewportSize = (px) => {
    return 100 * px / maxSize
}
const rearrange = element => {
    element.style.top = isSmallScreen() ? pxToViewportSize(element.dataset.top) + sizeUnit() : element.dataset.top + sizeUnit()
    element.style.left = isSmallScreen() ? pxToViewportSize(element.dataset.left) + sizeUnit() : element.dataset.left + sizeUnit()
}
const rearrangeElements = () => {
    elements = document.querySelectorAll('[data-top][data-left]')
    elements.forEach(element => rearrange(element))
}

mqlMaxWidth.addListener(e => rearrangeElements())
mqlMaxHeight.addListener(e => rearrangeElements())
mqlOrientation.addListener(e => rearrangeElements())

// Collection des murs axe horizontal droite-gauche
const blockedSquaresToLeft = [
    {top:300, left:200},{top:500, left:200},{top:700, left:200},{top:200, left:300},{top:300, left:300},{top:500, left:300},{top:800, left:300},
    {top:0, left:500}, {top:200, left:500}, {top:600, left:500}, {top:800, left:500}, {top:400, left:600}, {top:200, left:700}, {top:300, left:700},
    {top:500, left:700}, {top:800, left:700}, {top:700, left:800},
    //ligne en left 0
    {top:0, left:0}, {top:100, left:0}, {top:200, left:0}, {top:600, left:0}, {top:700, left:0}, {top:800, left:0},{top:900, left:0}
]
// Collection des murs axe horizontal gauche-droite
const blockedSquaresToRight = [
    {top:700, left:100}, {top:200, left:200},  {top:300, left:200},  {top:500, left:200},  {top:800, left:200}, {top:400, left:300},
    {top:0, left:400}, {top:200, left:400}, {top:600, left:400}, {top:800, left:400}, {top:200, left:600}, {top:300, left:600},
    {top:500, left:600}, {top:800, left:600}, {top:300, left:700}, {top:500, left:700}, {top:700, left:700},
    //ligne en left 900
    {top:0, left:900}, {top:100, left:900}, {top:200, left:900}, {top:600, left:900}, {top:700, left:900},
    {top:800, left:900}, {top:900, left:900}
]
// Collection des murs axe vertical bas-haut
const blockedSquaresToTop = [
    {top:400, left:0}, {top:600, left:0}, {top:800, left:0}, {top:100, left:100}, {top:200, left:100}, {top:400, left:100}, {top:600, left:100},
    {top:400, left:100}, {top:700, left:100}, {top:900, left:100}, {top:900, left:200}, {top:100, left:300}, {top:300, left:300},
    {top:700, left:300}, {top:900, left:300}, {top:200, left:400}, {top:500, left:400}, {top:600, left:400}, {top:800, left:400},
    {top:200, left:500}, {top:500, left:500}, {top:600, left:500}, {top:800, left:500}, {top:100, left:600}, {top:300, left:600},
    {top:700, left:600}, {top:900, left:600}, {top:900, left:700}, {top:100, left:800}, {top:200, left:800}, {top:400, left:800},
    {top:600, left:800}, {top:700, left:800}, {top:900, left:800},  {top:400, left:900}, {top:600, left:900}, {top:800, left:900} ,
    //ligne en top 0
    {top:0, left:0}, {top:0, left:100}, {top:0, left:200}, {top:0, left:300}, {top:0, left:400}, {top:0, left:500}, {top:0, left:600},
    {top:0, left:700}, {top:0, left:800}, {top:0, left:900}
]
// Collection des murs axe vertical haut-bas
const blockedSquaresToBottom = [
    {top:200, left:0}, {top:400, left:0}, {top:700, left:0}, {top:0, left:100}, {top:100, left:100}, {top:200, left:100}, {top:400, left:100},
    {top:600, left:100}, {top:800, left:100}, {top:800, left:200}, {top:0, left:300}, {top:200, left:300}, {top:600, left:300}, {top:800, left:300},
    {top:100, left:400}, {top:300, left:400}, {top:500, left:400}, {top:700, left:400}, {top:100, left:500}, {top:300, left:500}, {top:500, left:500},
    {top:700, left:500}, {top:0, left:600}, {top:200, left:600}, {top:600, left:600}, {top:800, left:600}, {top:800, left:700}, {top:0, left:800},
    {top:100, left:800}, {top:200, left:800}, {top:400, left:800}, {top:600, left:800}, {top:800, left:800}, {top:200, left:900}, {top:400, left:900},
    {top:700, left:900},
    //ligne en top 900
    {top:900, left:0}, {top:900, left:100}, {top:900, left:200}, {top:900, left:300}, {top:900, left:400}, {top:900, left:500}, {top:900, left:600},
    {top:900, left:700}, {top:900, left:800}, {top:900, left:900}
]
// Collection de dots à ne pas insérer
const dotsNotToInsert = [
    {top: '300px', left: '0px'}, {top: '300px', left: '100px'}, {top: '300px', left: '800px'}, {top: '300px', left: '900px'},
    {top: '400px', left: '400px'}, {top: '400px', left: '500px'}, {top: '500px', left: '0px'}, {top: '500px', left: '100px'},
    {top: '500px', left: '800px'}, {top: '500px', left: '900px'},

]
// Collection de dots à insérer
const dotsToInsert = [
    {top: '0px', left: '0px'}, {top: '0px', left: '100px'}, {top: '0px', left: '200px'}, {top: '0px', left: '300px'}, {top: '0px', left: '400px'},
    {top: '0px', left: '500px'}, {top: '0px', left: '600px'}, {top: '0px', left: '700px'}, {top: '0px', left: '800px'}, {top: '0px', left: '900px'},
    {top: '100px', left: '0px'}, {top: '100px', left: '100px'}, {top: '100px', left: '200px'}, {top: '100px', left: '300px'}, {top: '100px', left: '400px'},
    {top: '100px', left: '500px'}, {top: '100px', left: '600px'}, {top: '100px', left: '700px'}, {top: '100px', left: '800px'}, {top: '100px', left: '900px'},
    {top: '200px', left: '0px'}, {top: '200px', left: '100px'}, {top: '200px', left: '200px'}, {top: '200px', left: '300px'}, {top: '200px', left: '400px'},
    {top: '200px', left: '500px'}, {top: '200px', left: '600px'}, {top: '200px', left: '700px'}, {top: '200px', left: '800px'}, {top: '200px', left: '900px'},
    {top: '300px', left: '200px'}, {top: '300px', left: '300px'}, {top: '300px', left: '400px'}, {top: '300px', left: '500px'}, {top: '300px', left: '600px'},
    {top: '300px', left: '700px'}, {top: '400px', left: '0px'}, {top: '400px', left: '100px'}, {top: '400px', left: '200px'}, {top: '400px', left: '300px'},
    {top: '400px', left: '600px'}, {top: '400px', left: '700px'}, {top: '400px', left: '800px'}, {top: '400px', left: '900px'},
    {top: '500px', left: '200px'}, {top: '500px', left: '300px'}, {top: '500px', left: '400px'},
    {top: '500px', left: '500px'}, {top: '500px', left: '600px'}, {top: '500px', left: '700px'},
    {top: '600px', left: '0px'}, {top: '600px', left: '100px'}, {top: '600px', left: '200px'}, {top: '600px', left: '300px'}, {top: '600px', left: '400px'},
    {top: '600px', left: '500px'}, {top: '600px', left: '600px'}, {top: '600px', left: '700px'}, {top: '600px', left: '800px'}, {top: '600px', left: '900px'},
    {top: '700px', left: '0px'}, {top: '700px', left: '100px'}, {top: '700px', left: '200px'}, {top: '700px', left: '300px'}, {top: '700px', left: '400px'},
    {top: '700px', left: '500px'}, {top: '700px', left: '600px'}, {top: '700px', left: '700px'}, {top: '700px', left: '800px'}, {top: '700px', left: '900px'},
    {top: '800px', left: '0px'}, {top: '800px', left: '100px'}, {top: '800px', left: '200px'}, {top: '800px', left: '300px'}, {top: '800px', left: '400px'},
    {top: '800px', left: '500px'}, {top: '800px', left: '600px'}, {top: '800px', left: '700px'}, {top: '800px', left: '800px'}, {top: '800px', left: '900px'},
    {top: '900px', left: '0px'}, {top: '900px', left: '100px'}, {top: '900px', left: '200px'}, {top: '900px', left: '300px'}, {top: '900px', left: '400px'},
    {top: '900px', left: '500px'}, {top: '900px', left: '600px'}, {top: '900px', left: '700px'}, {top: '900px', left: '800px'}, {top: '900px', left: '900px'}
]
//Récupérer l'emplacement d'un élément
const getPositionOf = (element) => {
    const top = parseInt(element.dataset.top, 10)
    const left = parseInt(element.dataset.left, 10)
    return {top, left}
}

//Déplacement du pacMan

const movePacMan = (to) => {

    //PacMan mange les Pac-Gomme sur lesquelles il passe
    //Créer variable let score tout en haut du code
    //Récupérer la position de pacMan
    //Construire un tableau des positions de tous les points présents sur la carte:
    // document.querySelectorAll('.dot')
    //Supprimer du document le .dot sur lequel se trouve PacMan, par exemple avec un .forEach()
    //Incrémenter le score

    clearInterval(pacManInterval)
    // Orienter Pac-Man
    pacMan.className = to

    // Obtenir la position de Pac-Man
    pacManPosition = getPositionOf(pacMan)

    //Mettre une intervalle de répétition pour la fonction
    pacManInterval = setInterval(() => {
        // Évaluer la direction et déplacer Pac-Man en conséquences s'il ne rencontre pas de mur
        if (!isTheCharacterBlocked(pacManPosition, to)) {
            move(pacMan, pacManPosition, to)
            pacManPosition = getPositionOf(pacMan)
            testPositions()

        }}, movePacManInterval)


}

//Déplacement du fantôme

const moveRedGhost = () => {

    clearInterval(redGhostInterval)
    
    // Obtenir la position de ghost
    redGhostPosition = getPositionOf(redGhost)
    
    //Générer un "to" aléatoire
    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'


    //Mettre une intervalle de répétition pour la fonction
    redGhostInterval = setInterval(() => {
        if(gameLevel > 4) moveRedGhostInterval = 400
        else if(gameLevel > 7) moveRedGhostInterval = 300
        else if(gameLevel > 10) moveRedGhostInterval = 200
        else if(gameLevel > 13) moveRedGhostInterval = 100
        if(gameLevel > 1){
            moveToPacMan(redGhost)
        }
        else {
            // Évaluer la direction et déplacer le ghost en conséquences s'il ne rencontre pas de mur
            currentRedGhostDirection = randomDirection
            if (!isTheCharacterBlocked(redGhostPosition, randomDirection)) {
                move(redGhost, redGhostPosition, randomDirection)
                redGhostPosition = getPositionOf(redGhost)
                testPositions()
            }
            else {
                moveRedGhost()
                return
            }     
        }

    }, moveRedGhostInterval)


}
const moveOrangeGhost = () => {

    clearInterval(orangeGhostInterval)

    // Obtenir la position de ghost
    orangeGhostPosition = getPositionOf(orangeGhost)

    //Générer un "to" aléatoire
    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

    //Mettre une intervalle de répétition pour la fonction
    orangeGhostInterval = setInterval(() => {
        if(gameLevel > 5) moveOrangeGhostInterval = 400
        else if(gameLevel > 8) moveOrangeGhostInterval = 300
        else if(gameLevel > 11) moveOrangeGhostInterval = 200
        else if(gameLevel > 14) moveOrangeGhostInterval = 100
        if(gameLevel > 2){
            moveToPacMan(orangeGhost)
        }
        else{
            // Évaluer la direction et déplacer le ghost en conséquences s'il ne rencontre pas de mur
            currentOrangeGhostDirection = randomDirection
            if (!isTheCharacterBlocked(orangeGhostPosition, randomDirection)) {
                move(orangeGhost, orangeGhostPosition, randomDirection)
                orangeGhostPosition = getPositionOf(orangeGhost)
                testPositions()
            }
            else {
                moveOrangeGhost()
                return
            }
        }

    }, moveOrangeGhostInterval)


}
const moveBlueGhost = () => {

    clearInterval(blueGhostInterval)
    // Obtenir la position de ghost
    blueGhostPosition = getPositionOf(blueGhost)
    //Générer un "to" aléatoire
    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'
    //Mettre une intervalle de répétition pour la fonction
    blueGhostInterval = setInterval(() => {
        if(gameLevel > 6) moveBlueGhostInterval = 400
        else if(gameLevel > 9) moveBlueGhostInterval = 300
        else if(gameLevel > 12) moveBlueGhostInterval = 200
        else if(gameLevel > 15) moveBlueGhostInterval = 100
        if(gameLevel > 3){
            moveToPacMan(blueGhost)
        }
        else{
            // Évaluer la direction et déplacer le ghost en conséquences s'il ne rencontre pas de mur
            currentBlueGhostDirection = randomDirection
            if (!isTheCharacterBlocked(blueGhostPosition, randomDirection)) {

                move(blueGhost, blueGhostPosition, randomDirection)
                blueGhostPosition = getPositionOf(blueGhost)
                testPositions()
            }
            else {
                moveBlueGhost()
            }
        }

    }, moveBlueGhostInterval)
}

const move = (character, from, to) => {
    switch(to){
        case 'toLeft':
            character.dataset.left = from.left === 0 ? 900 : from.left - 100
            character.style.left = isSmallScreen() ? pxToViewportSize(character.dataset.left) + sizeUnit() : character.dataset.left + sizeUnit()
            break
        case 'toRight':
            character.dataset.left = from.left === 900 ? 0 : from.left + 100
            character.style.left = isSmallScreen() ? pxToViewportSize(character.dataset.left) + sizeUnit() : character.dataset.left + sizeUnit()
            break
        case 'toTop':
            character.dataset.top = from.top - 100
            character.style.top = isSmallScreen() ? pxToViewportSize(character.dataset.top) + sizeUnit() : character.dataset.top + sizeUnit()
            break
        case 'toBottom':
            character.dataset.top = from.top + 100
            character.style.top = isSmallScreen() ? pxToViewportSize(character.dataset.top) + sizeUnit() : character.dataset.top + sizeUnit()
            break
    }
}


const moveToPacMan = (ghost) => {
    const pacManPosition = getPositionOf(pacMan)
    const ghostPosition = getPositionOf(ghost)
    const delta = getDelta(pacManPosition, ghostPosition)
    console.log('delta:', delta)
    let direction
    if (delta.top === delta.left) direction = [delta.topDirection, delta.leftDirection][Math.floor(Math.random() * 2)]
    if (delta.topDirection === null) direction = delta.leftDirection
    else if (delta.leftDirection === null) direction = delta.topDirection
    else direction = delta.top < delta.left ? delta.topDirection : delta.leftDirection
    
    if (isTheCharacterBlocked(ghostPosition, direction)) {
        direction = direction === delta.topDirection ? delta.leftDirection : delta.topDirection
        if (direction === null) {
            let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection)
            direction = otherDirections[Math.floor(Math.random() * 2)]
        }
        console.log('direction:', direction)
    }

    while (isTheCharacterBlocked(ghostPosition, direction)) {
        let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection)
        direction = otherDirections[Math.floor(Math.random() * 2)]
    }
    move(ghost, ghostPosition, direction)
}
const getDelta = (pacManPosition, ghostPosition) => {
    const top = pacManPosition.top - ghostPosition.top
    const left = pacManPosition.left - ghostPosition.left
    let topDirection, leftDirection
    if (top === 0) topDirection = null
    else topDirection = top > 0 ? 'toBottom' : 'toTop'
    if (left === 0) leftDirection = null
    else leftDirection = left > 0 ? 'toRight' : 'toLeft'
    return { top, left, topDirection, leftDirection }
}

const displayDots = () => {
    for (let col = 0; col < 10; col++){
        for (let row = 0; row < 10; row++){
            const dot = document.createElement('div')
            dot.className = 'dot'
            dot.style.left = col * 100 + 'px'
            dot.style.top = row * 100 + 'px'
            dot.dataset.top = row * 100
            dot.dataset.left = col * 100
            if (!dotsNotToInsert.some(dot_nti => {   //dot_nti => dot_NotToInsert
                const mustInsert = dot.style.left === dot_nti.left && dot.style.top === dot_nti.top
                return mustInsert
            })){
                map.insertBefore(dot, pacMan)
            }
        }
    }
}

//principe du jeu
const removeDot = () => {
    pacManPosition = getPositionOf(pacMan)
    const dotToRemove = document.querySelector(`.dot[data-top="${ pacManPosition.top }"][data-left="${ pacManPosition.left }"]`)
    if (dotToRemove) {
        map.removeChild(dotToRemove)
        gameScore++
        dotsLeft --
        divScore.textContent = gameScore
        if (dotsLeft == 0){
            gameOver = true
            stopGame(false)
        }
    }
}

const timer = () => {
    setInterval(function() {
        if (!gameOver){
            time++
            divTimer.textContent = time
        }
    }, 1000)
}

const stopGame = (lost) => {
    clearInterval(redGhostInterval)
    //console.log("redGhost stopped")
    clearInterval(blueGhostInterval)
    //console.log("blueGhost stopped")
    clearInterval(orangeGhostInterval)
    //console.log("orangeGhost stopped")
    clearInterval(pacManInterval)
    //affichage du score et du timer
    console.log("Timer: " + time)
    console.log("Score: " + gameScore)
    console.log("Niveau: " + gameLevel)
    //moveGhostInterval -= 15
    if(!lost){
        gameOver = false
        gameLevel++
        setTimeout(start(), 0)
    }
    else {
        endGameBlock.style.display = "flex"
    }
    //gamePage.style.display = 'none'
    //scorePage.style.display = 'flex'
}

endButton.addEventListener('click', () => {
    //setTimeout(postForm(), 1000)
    setTimeout(insertScore(), 1000)
    gamePage.style.display = 'none'
    endGameBlock.style.display = "none"
    scorePage.style.display = 'flex'
})

const testPositions = () => {
    pacManPosition = getPositionOf(pacMan)
    blueGhostPosition = getPositionOf(blueGhost)
    redGhostPosition = getPositionOf(redGhost)
    orangeGhostPosition = getPositionOf(orangeGhost)

    if((pacManPosition.left == blueGhostPosition.left && pacManPosition.top == blueGhostPosition.top) || 
    (pacManPosition.left == redGhostPosition.left && pacManPosition.top == redGhostPosition.top) ||
    (pacManPosition.left == orangeGhostPosition.left && pacManPosition.top == orangeGhostPosition.top)){
        gameOver = true
        stopGame(true)
    }
}

const start = () => {
    //On remet les éléments à leur place
    pacManPosition = getPositionOf(pacMan) 
    blueGhostPosition = getPositionOf(blueGhost)
    orangeGhostPosition = getPositionOf(orangeGhost)
    redGhostPosition = getPositionOf(redGhost)
    if (pacManPosition !== {top:400, left:900}){
        pacMan.dataset.top = 400
        pacMan.style.top = "400px"
        pacMan.dataset.left = 900
        pacMan.style.left = "900px"
    }
    if (orangeGhostPosition !== {top:300, left:400}){
        orangeGhost.dataset.top = 300
        orangeGhost.style.top = "300px"
        orangeGhost.dataset.left = 400
        orangeGhost.style.left = "400px"
    }
    if (redGhostPosition !== {top:300, left:400}){
        redGhost.dataset.top = 300
        redGhost.style.top = "300px"
        redGhost.dataset.left = 400
        redGhost.style.left = "400px"
    }
    if (blueGhostPosition !== {top:300, left:400}){
        blueGhost.dataset.top = 300
        blueGhost.style.top = "300px"
        blueGhost.dataset.left = 400
        blueGhost.style.left = "400px"
    }
    
    //On remet pacMan dans la bonne disposition
    if(pacMan.className != "toLeft") pacMan.className = "toLeft"
    
    dotsLeft = dotsToInsert.length
    if(time == 0) divTimer.textContent = "0"
    if(gameScore == 0) divScore.textContent = "0"
    divNiveau.textContent = gameLevel
    moveRedGhost()
    moveOrangeGhost()
    moveBlueGhost()
    displayDots()
    timer()
}

//Event quand on appuie sur le clavier
addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 37:
            movePacMan('toLeft')
            break
        case 39:
            movePacMan('toRight')
            break
        case 38:
            movePacMan('toTop')
            break
        case 40:
            movePacMan('toBottom')
            break
    }
})

//Pacman s'arrête quand il rencontre un mur
const isTheCharacterBlocked = (characterPosition, movingDirection) => {

    // Nous déterminons quel tableau est concerné par la direction prise
    let blockedSquares

    switch (movingDirection) {

        case 'toLeft':
            blockedSquares = blockedSquaresToLeft
            removeDot()
            break
        case 'toRight':
            blockedSquares = blockedSquaresToRight
            removeDot()
            break
        case 'toTop':
            blockedSquares = blockedSquaresToTop
            removeDot()
            break
        case 'toBottom':
            blockedSquares = blockedSquaresToBottom
            removeDot()
            break
    }

    // Nous retournons un booléen indiquant si la position du personnage
    // est référencée dans le tableau
    return blockedSquares.some(square => {
        const topsAreEquals = characterPosition.top === square.top
        const leftsAreEquals = characterPosition.left === square.left
        return topsAreEquals && leftsAreEquals
    })

}

const checkUsername = () => {    

    console.log(userName)
    fetch('./datas.php?function=verif_username', {method: 'POST', headers: {"Content-Type" : "text/plain"}, body: username = userName})
    .then(response => {
        console.log(response)
        if(response == 'disponible') return true
        else return false
    })


/*
    return new Promise((resolve, reject) => {
        //Var Ajax
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if((this.readyState == 4 && this.status == 200)){
            verifyUsername = this.responseText
        }
    }
    xhr.open('POST', "./datas.php?function=verif_username")
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send('username=' + userName);

    if (verifyUsername == "disponible") resolve()
    else if (verifyUsername == "non") reject()
    })*/
    
}

const insertScore = () => {
    //Var Ajax
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if((this.readyState == 4 && this.status == 200)){
            console.log(this.responseText)
            return true
        }
    }
    xhr.open('POST', "./datas.php?function=insert_score")
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send('username=' + userName + '&timer=' + time + '&score=' + gameScore + '&level=' + gameLevel);
}

// Nous créons une variable vide au début du code
// let userName
let isInsert = 0

submit.addEventListener('click', (e) => {
     e.preventDefault()
     //Vérifier que inputName.value n'est pas vide et contient au moins 3 caractères
    //console.log(inputName.value)
    if(inputName.value !== "" && inputName.value.length >= 2 && inputName.value.length <= 8){
        userName = inputName.value
        let canStart = checkUsername()
        if(canStart == true) {      //
            start()
            gameLevel = 1
            homePage.style.display = 'none'
            gamePage.style.display = 'flex' 
        }
        else{
            //alert("Pseudo déjà choisi")
            const errorText = document.createElement('h4')
            if (isInsert == 0) {
                errorText.textContent = "Ce pseudo existe déjà!"
                inputBlock.appendChild(errorText)
                isInsert++
            }
            
        }
        //Lancer la partie
        /*console.log(verifyUsername)
        if(verifyUsername == "disponible"){
            start()
            gameLevel = 1
            homePage.style.display = 'none'
            gamePage.style.display = 'flex' 
        }
        else if(verifyUsername == "non"){
            alert("Pseudo déjà choisi")
        } */
        
    }
})
