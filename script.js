// Game Constants & variables
let inputDir = {x: 0, y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
// const musicSound = new Audio('music.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
     {x: 13, y: 15}
]
food = {x: 6, y: 7}
let score = 0;
// Game Functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(sArr){
    // if you bump into yourself
    for(let i = 1;i<snakeArr.length;i++) {
        if(sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y){
            return true;
        }
    }
    // if you bump into the wall
    if((sArr[0].x >=18 || sArr[0].x<=0) || (sArr[0].y>=18 || sArr[0].y<=0)){
        return true;
    }

}
function gameEngine(){
    //Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        // musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game over. Press any key to play again!");
        snakeArr = [{x:13, y: 15}];
        // musicSound.play();
        score = 0;
        document.getElementById('score').innerHTML = "Score " + score;
    }
    // if you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play(); 
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        food = {x: Math.round(2 + (14)*Math.random()), y: Math.round(2+(14)*Math.random())}
        score+=1
        if(score > hiscoreval ){
            hiscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            document.getElementById('highScore').innerHTML = "HiScore: " + hiscoreval;
        }
        document.getElementById('score').innerHTML = "Score " + score;
    }

    // Moving the snake
    for(let i = snakeArr.length - 2;i >=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;

    //Part 2: Display the snake and food
    // Display the snake
    document.getElementById('board').innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake')
        }
        document.getElementById('board').appendChild(snakeElement);
    })
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    document.getElementById('board').appendChild(foodElement);

}


//Main logic starts here
let hiscore = localStorage.getItem("hiscore");
let hiscoreval;
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    document.getElementById('highScore').innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1} //  Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
