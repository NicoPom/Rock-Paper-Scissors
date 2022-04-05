const scoreEl = document.getElementById("score")
const main = document.getElementById("main")
const results = document.getElementById("result")
const computerResult = document.getElementById("computerResult")
const playerResult = document.getElementById("playerResult")
const messageSection = document.getElementById("message-section")

const choices = ["rock", "paper", "scissors"]
const scoreFromLocalStorage =  JSON.parse( localStorage.getItem("score") )

let playerChoice = undefined
let computerChoice = undefined
let score = 0
let roundFinished = false

if (scoreFromLocalStorage) {
    updateScore(scoreFromLocalStorage)
}

document.addEventListener("click",(event)=>{

    if (event.target.matches("#open-modal")){
        document.getElementById("modal").style.display = "flex";
    }

    if (event.target.matches("#close-modal")){
        document.getElementById("modal").style.display = "none";
    }

    if (event.target.matches(".coin")){

        if(!roundFinished){
            roundFinished = true
            //assign choices to
            playerChoice = event.target.id
            computerChoice = getComputerChoice()

            // displaying results //
                //step 1 / display player result
            updateResultHtml(playerResult, playerChoice) 
                //intermediate step
            addPlaceHolder() 
                // step 2 / display computer result
            setTimeout(() => {  
                removePlaceHolder()
                updateResultHtml(computerResult, computerChoice)
            }, 1000);
                //step 3 / announce winner & display play again button
            setTimeout(() => {
                getWinner()
            }, 1500);
        }
    }
    if (event.target.matches("#play-again")){
        roundFinished = false
        playAgain()
    }
    if (event.target.matches("#reset-score")){
        localStorage.clear()
        score = 0
        scoreEl.textContent = 0
    }

})

function getWinner(){
    const result = playerChoice+computerChoice

    //draw
    if (playerChoice === computerChoice){
        displayWinner("Tie")
    }   
    //player won
    else if (result === "rockscissors"
    ||result === "scissorspaper"
    ||result === "paperrock" ){
        updateScore(1)
        localStorage.setItem("score", JSON.stringify(score))
        displayWinner("You win")
    }   
    //player lose
    else{
        displayWinner("You lose")
    }
}

function getComputerChoice(){
    return choices[Math.floor(Math.random() * choices.length)]
}

function updateScore(value){
    score += value
    scoreEl.textContent = score
}

function updateResultHtml(resultEl, choice){
    // hide game / show the result
    main.style.display = "none"
    results.style.display = "flex"
    //class reset
    resultEl.classList.remove("coin-paper", "coin-rock", "coin-scissors")

    // update img and bg
    const img = resultEl.querySelector("img")
    resultEl.classList.add(`coin-${choice}`)
    img.src = `images/icon-${choice}.svg`
    img.alt = `icon-${choice}`
}

function addPlaceHolder(){
    computerResult.querySelector(".coin-background", ".coin-img").style.display = "none"
    computerResult.classList.remove("coin", "coin-paper", "coin-rock", "coin-scissors")
    computerResult.classList.add("placeholder")
}

function removePlaceHolder(){
    computerResult.querySelector(".coin-background", ".coin-img").style.display = "block"
    computerResult.classList.remove("placeholder")
    computerResult.classList.add("coin")
}

function displayWinner(text){
    const message = document.getElementById("message")
    messageSection.style.display = "flex"
    message.textContent = text
}

function playAgain(){
    main.style.display = "block"
    results.style.display = "none"
    messageSection.style.display = "none"
}










/*
const choices = ["rock", "paper", "scissors"]
const main = document.getElementById("main")
const scoreDisplay = document.getElementById("score")
let playerChoice = ""
let computerChoice = ""
let roundFinished = false
let score = 0

renderInitialGame()
function getComputerChoice(){
    computerChoice = choices[Math.floor(Math.random() * choices.length)]
}
function renderComputerChoice(event){
    main.innerHTML = `
    <div class="row top-row">
        <button id="${event.target.id}" class="coin coin-${event.target.id}">
            <div class="coin-background">
                <img class="coin-img" src="images/icon-${event.target.id}.svg" alt="icon-${event.target.id}" >
            </div>
        </button>
        <button id="${computerChoice}" class="coin coin-${computerChoice}">
            <div class="coin-background">
                <img class="coin-img" src="images/icon-${computerChoice}.svg" alt="icon-${computerChoice}" >
            </div>
        </button>
    </div>
    <div class="flex">
        <div>You picked</div>
        <div>The house picked</div>
    </div>
    `
    return computerChoice
}
document.addEventListener("click", function (event){

    if (event.target.matches("#open-modal")){
        document.getElementById("modal").style.display = "flex";
    }
    if (event.target.matches("#close-modal")){
        document.getElementById("modal").style.display = "none";
    }
    if(event.target.matches(".coin")){

        if(!roundFinished){
            renderChoice(event)

            setTimeout(function(){
                getComputerChoice()
                renderComputerChoice(event)
                switch (event.target.id + renderComputerChoice(event)) {
                    case "rockscissors":
                    case "scissorspaper":
                    case "paperrock":
                        score += 1
                        main.innerHTML +=`
                        <div class="end-game">
                            <p class="message">You Win</p>
                            <button id="play-again" class="btn-play-again">Play Again</button>
                        </div>
                        `
                        break;
                    case "scissorsrock":
                    case "paperscissors":
                    case "rockpaper":
                        score -= 1
                        main.innerHTML +=`
                        <div class="end-game">
                            <p class="message">You Lose</p>
                            <button id="play-again" class="btn-play-again">Play Again</button>
                        </div>
                        `

                        break;
                    case "paperpaper":
                    case "scissorsscissors":
                    case "rockrock":
                        main.innerHTML +=`
                        <div class="end-game">
                            <p class="message">Tie</p>
                            <button id="play-again" class="btn-play-again">Play Again</button>
                        </div>
                        `
                        break;
                }
                scoreDisplay.textContent = score
            }, 700)
        }
    }
    if(event.target.matches("#play-again")){
        roundFinished = false
        renderInitialGame()
        main.style.backgroundImage = "url(images/bg-triangle.svg)"
    }
})

function renderInitialGame(){
    main.innerHTML=
    `<div class="row top-row">
        <button id="paper" class="coin coin-paper">
            <div class="coin-background">
                <img class="coin-img" src="images/icon-paper.svg" alt="icon-paper" >
            </div>
        </button>

        <button id="scissors" class="coin coin-scissors">
            <div class="coin-background">
                <img class="coin-img" src="images/icon-scissors.svg" alt="icon-scissors" >
            </div>
        </button>
    </div>

    <div class="row bottom-row">
        <button id="rock" class="coin coin-rock">
            <div class=" coin-background">
                <img class="coin-img" src="images/icon-rock.svg" alt="icon-rock" >
            </div>
        </button>
    </div>
    `
}
function renderChoice(event){
    roundFinished = true
    main.style.backgroundImage = "none"
    main.innerHTML = `
    <div class="row top-row">
        <button id="${event.target.id}" class="coin coin-${event.target.id}">
            <div class="coin-background">
                <img class="coin-img" src="images/icon-${event.target.id}.svg" alt="icon-${event.target.id}" >
            </div>
        </button>
        <div id="placeholder" class="placeholder"></div>
    </div>
    <div class="flex">
        <div>You picked</div>
        <div>The house picked</div>
    </div>
    `
}
*/




