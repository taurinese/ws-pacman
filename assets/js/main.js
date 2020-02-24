//Variables globales
const pacMan = document.querySelector('img[src="assets/img/pacman.gif"]')
const redGhost = document.querySelector('img[src="assets/img/redghost.png"]')
const orangeGhost = document.querySelector('img[src="assets/img/orangeghost.png"]')
const blueGhost = document.querySelector('img[src="assets/img/blueghost.png"]')
const map = document.querySelector('.map')
const submit = document.querySelector('button[type=submit]')
const inputName = document.querySelector('input[type=text]')
const divScore = document.querySelector('.score')
const divTimer = document.querySelector('.timer')
//const submit = document.querySelector('#button_submit')

let pacManInterval
let redGhostInterval
let orangeGhostInterval
let blueGhostInterval

let pacManPosition
let redGhostPosition
let blueGhostPosition
let orangeGhostPosition

let movePacManInterval = 150
let moveGhostInterval = 150


let currentRedGhostDirection
let currentOrangeGhostDirection
let currentBlueGhostDirection

let gameScore = 0
let dotsLeft = 0
let time = 0
let userName

let gameOver
let gameLevel

const directions = [ 'toLeft', 'toRight', 'toTop', 'toBottom' ]

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
    const top = parseInt(window.getComputedStyle(element, null).getPropertyValue('top'), 10)
    const left = parseInt(window.getComputedStyle(element, null).getPropertyValue('left'), 10)
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
            switch (to) {

                case 'toLeft':
                    // Si Pac-Man est au bord gauche situé à 0px
                    // nous le ramenons au bord droit situé à 900px,
                    // sinon nous le déplaçons de 100px vers la gauche
                    pacMan.style.left = pacManPosition.left === 0 ? 900 + "px" :
                        pacManPosition.left - 100 + "px"
                    break

                case 'toRight':
                    // Si Pac-Man est au bord droit situé à 900px
                    // nous le ramenons au bord gauche situé à 0px,
                    // sinon nous le déplaçons de 100px vers la droite
                    pacMan.style.left = pacManPosition.left === 900 ? 0 :
                        pacManPosition.left + 100 + "px"
                    break

                case 'toTop':
                    // Nous déplaçons Pac-Man de 100px vers le haut
                    pacMan.style.top = pacManPosition.top - 100 + "px"
                    break

                case 'toBottom':
                    // Nous déplaçons Pac-Man de 100px vers le bas
                    pacMan.style.top = pacManPosition.top + 100 + "px"
                    break
            }
            pacManPosition = getPositionOf(pacMan)
            redGhostPosition = getPositionOf(redGhost)
            blueGhostPosition = getPositionOf(blueGhost)
            orangeGhostPosition = getPositionOf(orangeGhost)
            if((pacManPosition.left === redGhostPosition.left && pacManPosition.top === redGhostPosition.top) ||
                (pacManPosition.left === blueGhostPosition.left && pacManPosition.top === blueGhostPosition.top) ||
                (pacManPosition.left === orangeGhostPosition.left && pacManPosition.top === orangeGhostPosition.top)){
                gameOver = true
                //stopGame()
            }

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
        // Évaluer la direction et déplacer le ghost en conséquences s'il ne rencontre pas de mur
        if (!isTheCharacterBlocked(redGhostPosition, randomDirection)) {
            currentRedGhostDirection = randomDirection
            switch (randomDirection) {

                case 'toLeft':
                    redGhost.style.left = redGhostPosition.left === 0 ? 900 + "px" :
                        redGhostPosition.left - 100 + "px"
                    break

                case 'toRight':
                    redGhost.style.left = redGhostPosition.left === 900 ? 0 :
                        redGhostPosition.left + 100 + "px"
                    break

                case 'toTop':
                    redGhost.style.top = redGhostPosition.top - 100 + "px"
                    break

                case 'toBottom':
                    redGhost.style.top = redGhostPosition.top + 100 + "px"
                    break
            }
            redGhostPosition = getPositionOf(redGhost)
        }
        else {
            moveRedGhost()
            return
        }
    }, moveGhostInterval)


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
        // Évaluer la direction et déplacer le ghost en conséquences s'il ne rencontre pas de mur
        if (!isTheCharacterBlocked(orangeGhostPosition, randomDirection)) {
            currentOrangeGhostDirection = randomDirection
            switch (randomDirection) {

                case 'toLeft':
                    orangeGhost.style.left = orangeGhostPosition.left === 0 ? 900 + "px" :
                        orangeGhostPosition.left - 100 + "px"
                    break

                case 'toRight':
                    orangeGhost.style.left = orangeGhostPosition.left === 900 ? 0 :
                        orangeGhostPosition.left + 100 + "px"
                    break

                case 'toTop':
                    orangeGhost.style.top = orangeGhostPosition.top - 100 + "px"
                    break

                case 'toBottom':
                    orangeGhost.style.top = orangeGhostPosition.top + 100 + "px"
                    break
            }
            orangeGhostPosition = getPositionOf(orangeGhost)
        }
        else {
            moveOrangeGhost()
            return
        }
    }, moveGhostInterval)


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
        // Évaluer la direction et déplacer le ghost en conséquences s'il ne rencontre pas de mur
        if (!isTheCharacterBlocked(blueGhostPosition, randomDirection)) {
            currentBlueGhostDirection = randomDirection
            switch (randomDirection) {

                case 'toLeft':
                    blueGhost.style.left = blueGhostPosition.left === 0 ? 900 + "px" :
                        blueGhostPosition.left - 100 + "px"
                    break

                case 'toRight':
                    blueGhost.style.left = blueGhostPosition.left === 900 ? 0 :
                        blueGhostPosition.left + 100 + "px"
                    break

                case 'toTop':
                    blueGhost.style.top = blueGhostPosition.top - 100 + "px"
                    break

                case 'toBottom':
                    blueGhost.style.top = blueGhostPosition.top + 100 + "px"
                    break
            }
            blueGhostPosition = getPositionOf(blueGhost)
        }
        else {
            moveBlueGhost()
        }
    }, moveGhostInterval)


}

const displayDots = () => {
    for (let col = 0; col < 10; col++){
        for (let row = 0; row < 10; row++){
            const dot = document.createElement('div')
            dot.className = 'dot'
            dot.style.left = col * 100 + 'px'
            dot.style.top = row * 100 + 'px'
            dot.id = col * 100 + '_' + row * 100 //ou utiliser data-value
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
    const dots_nl = map.childNodes
    dots_nl.forEach(dots => {
        if (dots.id == pacManPosition.left + "_" + pacManPosition.top){
            map.removeChild(dots)
            gameScore++
            dotsLeft --
            divScore.textContent = "Score: " + gameScore
            if (dotsLeft == 0){
                gameOver = true
                stopGame()
            }
        }
    })

}

const timer = () => {
    setInterval(function() {
        if (!gameOver){
            time++
            divTimer.textContent = "Timer: " + time
            //console.log(time)
        }
    }, 1000)
}

const stopGame = () => {
    clearInterval(redGhostInterval)
    //console.log("redGhost stopped")
    clearInterval(blueGhostInterval)
    //console.log("blueGhost stopped")
    clearInterval(orangeGhostInterval)
    //console.log("orangeGhost stopped")
    //affichage du score et du timer
    console.log("Timer: " + time)
    console.log("Score: " + gameScore)
    gameLevel++
    console.log("Niveau: " + gameLevel)
    //moveGhostInterval -= 15
    setTimeout(start, 3000)
}

const start = () => {
    pacManPosition = getPositionOf(pacMan) //déclarer tout en haut pr ne pas répéter avec movePacMan ??

    if (pacManPosition !== {top:400, left:900}){
        pacMan.style.top = "400px"
        pacMan.style.left = "900px"
    }
    dotsLeft = dotsToInsert.length
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

// Nous créons une variable vide au début du code
// let userName

submit.addEventListener('click', (e) => {
     e.preventDefault()
     //Vérifier que inputName.value n'est pas vide et contient au moins 3 caractères
    console.log(inputName.value)
    if(inputName.value !== "" && inputName.value.length >= 3){
        userName = inputName.value
        //Lancer la partie
        start()
        gameLevel = 1
    }
})
