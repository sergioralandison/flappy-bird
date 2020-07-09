
var cvs = document.getElementById("canvas"); // select and place the canvas in a variable cvs
var ctx = cvs.getContext("2d"); // give methods propreties to the variable cvs and place it in a variable ctx

// SET IMAGES

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
/* const sprite = new Image(); */

// LOAD IMAGES SOURCES

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

/*sprite.src = "images/sprite.png";

 GAME STATE
const state = {
  current : 0,
  over : 1
}

CONTROL THE GAME
 document.addEventListener("click", function) */

// SOME VARIABLES

var gap = 85;
var constant = pipeNorth.height+gap;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// SET AUDIO FILES

var fly = new Audio();
var scor = new Audio();

// LOAD AUDIO FILES

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// WHEN PRESS A KEY

document.addEventListener("keydown",moveUp);

function moveUp() {
  bY -= 25;
  fly.play();
}

// PIPE COORDINATES

var pipe = []; // array

pipe[0] = {       // initiate array coordinates
  x : cvs.width,
  y : 0
};

// DRAW IMAGES

function draw(){

  ctx.drawImage(bg,0,0); // "function drawImage" allow us to draw the object, here it's the "background"

  // LOOP

  for (var i = 0; i < pipe.length; i++) { /* statement 1 : sets a variable before the loop starts (var i = 0).
                                             statement 2 : defines the condition for the loop to run (i must be less than pipe.length)
                                             statement 3 : increases a value (i++) each time the code block in the loop has been executed.
                                          */

    // code block to be executed

    ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
    ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

    pipe[i].x--; // pipe movement to the left

    if( pipe[i].x == 125 ) { // if pipe reaches this position "125", add new coordinates
        pipe.push({ // push near coordinates
          x : cvs.width,
          y : Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height // returns a random integer from 0 to the maximum Y position and minus the height of this pipe
        });
    }

    // DETECT COLLISSION

    if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width
      && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >=           // conditions
      pipe[i].y+constant) || bY + bird.height >= cvs.height - fg.height){
        location.reload();  // block of code to be executed if the condition is true
        alert("GAME OVER"); // reload the page
    }

    if(pipe[i].x == 5){ // if pipe reaches this position "5", increase score
      score++;  // block of code to be executed if the condition is true
      scor.play();
    }

  }

  ctx.drawImage(fg,0,cvs.height - fg.height); // draw foreground with cvs height minus foreground height

  ctx.drawImage(bird,bX,bY);

  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : "+score,10,cvs.height-20);

  requestAnimationFrame(draw); // recall the animation of the "function draw", again and again...

}

draw();
