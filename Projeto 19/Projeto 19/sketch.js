var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var play= 1;
var end= 0;
var gameState = "play";
var points = 0;



function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(width/2,height-20,20,20);
  ghost.addImage("ghoststanding",ghostImg);
  ghost.scale=0.09;

  climbersGroup = new Group();
  doorsGroup = new Group();
  

}

function draw() {
  
  if(gameState===play){
    background();
    ghost.x = World.mouseX;


   if(tower.y > height ){
     tower.y = height/2;
   }
  
    createClimbers();
    createDoors();

    if (climbersGroup.isTouching(ghost)) {
      climbersGroup.destroyEach();
      points += 50;
    }
    else{
      if(doorsGroup.isTouching(ghost)) {
        gameState=end;
        
        play(spookySound);
        ghost.visible = false;
        
        climbersGroup.destroyEach();
        doorsGroup.destroyEach();
       
        
        doorsGroup.setVelocityYEach(0);
        climbersGroup.setVelocityYEach(0);
    }
  }
    edges= createEdgeSprites();
    ghost.collide(edges);

    drawSprites();
    textSize(20);
    fill(255);
    text("Pontuação: "+ points,width-150,30);
  }

}

function createClimbers(){
  if(World.frameCount % 180 == 0){
    var climber = createSprite(Math.round(random(50, width-50),40, 10, 10));
    climber.addImage(climberImg);
    climber.scale=0.03;
    climber.velocityY = 6;
    climber.lifetime = 200;
    climbersGroup.add(climber);
  }
}

function createDoors(){
  if(World.frameCount % 150 == 0){
    var door = createSprite(Math.round(random(50, width-50),40, 10, 10));
    door.addImage(doorImg);
    door.scale=0.04;
    door.velocityY = 5;
    door.lifetime = 200;
    doorsGroup.add(door);
  }
}
