var difficulty = 1000;
var isGameRunning = false;


var difficultyButtonElements = document.querySelectorAll('[data-difficulty]');
var playButton = document.querySelector('#play');
var timerElement = document.querySelector('#timer');
var scoreElement = document.querySelector('#score');
var playAreaElement = document.querySelector('#playArea');
var boxesElement = drawBoxes();
var stopBtn = document.querySelector('#stop');

//Set Difficulty
difficultyButtonElements.forEach(function(button){
    

    button.addEventListener('click',(event)=>{
        
        if(event.target.getAttribute('data-difficulty') === "easy"){
            difficulty = 1000;
            difficultyButtonElements.forEach(element=>{
                element.classList.remove('active');
            });
            event.target.classList.add('active');
        } 
        else if(event.target.getAttribute('data-difficulty') === "medium"){
            difficulty = 500;
            difficultyButtonElements.forEach(element=>{
                element.classList.remove('active');
            });
            event.target.classList.add('active');
        }
        else if(event.target.getAttribute('data-difficulty') === "hard"){
            difficulty = 200;
            difficultyButtonElements.forEach(element=>{
                element.classList.remove('active');
            });
            event.target.classList.add('active');
        }
    })
})

stopBtn.addEventListener('click',()=>{
    stopGame();
})

var timerID;
function startGame(){
    scoreElement.innerHTML = 0;
    stopBtn.classList.remove('hidden');
    timerElement.innerHTML = 0;
    let a = 0;
    timerID = setInterval(() => {
        clearBoxes();
        if(a==30000){            
            stopGame();
        }
        else{
            a = a+1000;
            timerElement.innerHTML = a/1000;
            boxesElement[randomizer()].classList.add('greenbox');
        }
    }, difficulty);    
    
}


function stopGame(){
    stopBtn.classList.add('hidden');
    clearInterval(timerID);
    clearBoxes();
    timerElement.innerHTML = 0;
    isGameRunning = false;
}

function clearBoxes(){
    boxesElement.forEach(box=>{
        box.classList.remove('greenbox');
        box.classList.remove('redbox');
    })
}

function randomizer(){
    let randomNumber = Math.floor(Math.random() * (15 - 0 + 1)) + 0;
    console.log(randomNumber);
    return randomNumber;
}


boxesElement.forEach(box=>{
    box.addEventListener('click',(event)=>{
        if(isGameRunning){
            if(event.target.classList.contains('greenbox')){
                scoreElement.innerHTML = parseInt(scoreElement.innerHTML) + 100;
            }
            else{
                event.target.classList.add('redbox');
                scoreElement.innerHTML = parseInt(scoreElement.innerHTML) - 500;
            }
        }
        else{
            event.preventDefault();
            event.stopPropagation();
        }
    });
});



playButton.addEventListener('click',event=>{
    isGameRunning = true;
    startGame();
})


function drawBoxes(){
    for(let i=1; i <= 16; i++){
    
        let div = document.createElement('div');
        div.classList.add('box');
        playAreaElement.appendChild(div);
    }
    return document.querySelectorAll('.box');
}