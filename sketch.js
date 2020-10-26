const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
const horizon = 100;
const GROUND = 383;
const imgSize = 100;

let playing = false;
let startButton;
const startButton = { 
  x: 200,
  y: 100,
  w: imgSize,
  h: imgSize,
}


let ninja;
let ninjaAnimR;
let ninjaAnimL;

let canvas;
let bg = [];
let gameOver = false;
let score;

let bomb;
const bombObject = { 
  x: 10,
  y: 0,
  w: imgSize,
  h: imgSize,
  speed: 5,
}


let dart;
const dartObject = { 
  x: 150,
  y: 0,
  w: imgSize,
  h: imgSize,
  speed: 3,
}




function preload() {

  const NinjaRSpriteSheet = loadSpriteSheet("img/NinjaR.png", 64, 64, 6);
  const NinjaLSpriteSheet = loadSpriteSheet("img/NinjaL.png", 64, 64, 6);

  ninjaAnimR = loadAnimation(NinjaRSpriteSheet);
  ninjaAnimL = loadAnimation(NinjaLSpriteSheet);
  ninja = createSprite(CANVAS_WIDTH / 2, GROUND, 64, 64);
  ninja.moveSpeed = 6;

  startButton.image = laodImage('ing/button.png');
  bombObject.image = loadImage('img/bomb.png');
  dartObject.image = loadImage('img/dart.png');

}

function setup() {
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  bg = loadImage('img/background.png');
  ninja.addAnimation("moveR", ninjaAnimR);
  ninja.addAnimation("moveL", ninjaAnimL);
  ninja.addImage("still", loadImage("img/Ninja-1.png"));
  ninja.setDefaultCollider()
}

function startGame(){
  startButton.destroy();
  ninja.body.velocity.set(150, -150);
  playing = true;
}

function create(){
  startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
  startButton.anchor.set(0.5);
}



function update(object) {
  if (keyDown("left") || keyDown("right")) {
    if (keyDown("left")) {
      object.addSpeed(2, 180);
      object.mirrorX(-1);
    }
    if (keyDown("right")) {
      object.addSpeed(2, 0);
      object.mirrorX(1);
    }
  } else {
    object.setSpeed(0);
  }
  drawObject(object);
}

function drawObject(object) {
  if (object.getSpeed() > 0.0001) {
    object.changeAnimation("moveR");
  } else {
    object.changeImage("still");
  }
  ninja.limitSpeed(ninja.moveSpeed);
  drawSprite(object);
}

function draw() {
  background(bg);



  if(bombObject.y < 0  || bombObject.y > height - bombObject.h){
    bombObject.speed *= -1;
}

bombObject.y += bombObject.speed;

image(bombObject.image, bombObject.x, bombObject.y, bombObject.w, bombObject.h);



if(dartObject.y < 0  || dartObject.y > height - dartObject.h){
  dartObject.speed *= -1;
}
dartObject.y += dartObject.speed;

image(dartObject.image, dartObject.x, dartObject.y, dartObject.w, dartObject.h);



  if(!gameOver){
    drawGame();
  } else {
    background(0)
    drawGameOver();
  }

  function drawGame(){
    update(ninja);
  }


  function drawGameOver(){

  }



}