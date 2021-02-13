var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacle,obstacleImg,obstacleGroup;
var boy,boyImg;
var background,backgroundImg;
var invisible;
var home,homeImg,homeGroup;
var score = 0;
var home = 0;

function preload(){
  backgroundImg = loadImage("road background.jpg");
  boyImg = loadImage("pizza boy.png");
  obstacleImg = loadImage("car.png");
  homeImg = loadImage("home.png");
  obstacleGroup = new Group();
  homeGroup = new Group();
}

function setup() {
 createCanvas(600,300);
  background = createSprite(100,50);
  background.addImage(backgroundImg);
  background.scale = 3.5; 
  background.x = background.width/2;
 
  boy = createSprite(100,250);
  boy.addImage(boyImg);
  boy.scale = 0.5;
  
  invisible = createSprite(600,300,1200,10);
  invisible.visible = false;
 
}

function draw() {
  text("Score: ",score,550,50);
  textSize(10);
  fill("blue"); 
  text("Home: ",home,400,50);
  textSize(10);
  fill("blue");
  if(gameState === PLAY){
      
      boy.collide(invisible);
    boy.collide(obstacleGroup);
    score = score+Math.round(getFrameRate()/60);
    background.velocityX = -2;
    if(background.x<0){
      background.x = background.width/2;
    }
    if(keyDown("space")){
      boy.velocityY = -12;
    }
   if(homeGroup.isTouching(boy)){
     home = home+1;
     homeGroup.destroyEach();
   }
    boy.velocityY = boy.velocityY + 0.8;
  spawnObstacle();
  spawnHome();
  drawSprites();

    if(obstacleGroup.isTouching(boy)){
      gameState = END;
    }
  }
  else if(gameState === END){
    boy.x = 0;
    obstacleGroup.x = 0;
    boy.velocityX = 0;
    obstacleGroup.setLifetimeEach = 0;
    obstacleGroup.VelocityX= 0;
    obstacleGroup.Lifetime = -1;
    background.velocityX = 0;
    
    stroke("yellow");
    fill("yellow");
    textSize(20);
    text("GAMEOVER",200,200);
    

    
  }
}
function spawnObstacle(){
  if(frameCount % 300 === 0){
  obstacle = createSprite(600,260)
  obstacle.velocityX = -(2+3*score/100);
  obstacle.addImage(obstacleImg);
    obstacle.lifetime = 300;
    obstacle.scale = 0.5;
  obstacleGroup.add(obstacle);
  }
}
function spawnHome(){
  if(frameCount % 450 === 0){
    home = createSprite(600,200);
    home.velocityX = -(2+3*score/100);
    home.addImage(homeImg);
    home.lifetime = 300;
    home.scale =0.3;
    homeGroup.add(home);
  }
}