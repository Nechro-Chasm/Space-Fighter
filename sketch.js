var player, enemy1, laser
var playerImg, enemy1Img, bgImg, laserImg, explosionImg, backgroundImg, e2Img;
var bgmMusic, destroySound;
var enemy1Grp, enemy2Grp, playerBulletGrp, e1BulletGrp;
var battery, e1;
var score = 0;
var stage1Ecount = 5;
var gameLevel = "stage2"

function preload(){
playerImg = loadImage("assets/Player (1).png")
enemy1Img = loadImage("assets/Player (2).png")
bgImg = loadImage("assets/Space.png")
laserImg = loadImage("assets/Light.png")
explosionImg = loadImage("assets/Explosion.png")
backgroundImg = loadImage("assets/Background2.png")
e2Img = loadImage("assets/e2.png")

bgmMusic = loadSound("assets/BGM.mp3")
destroySound = loadSound("assets/destroy.mp3")
}

function setup(){
createCanvas(1250, 600);
bgmMusic.play();
bgmMusic.setVolume(0.3)

enemy1Grp = new Group();
ebemy2Grp = new Group();
playerBulletGrp = new Group();
e1BulletGrp = new Group();

player = createSprite(625, 500, 50, 50);
player.addImage(playerImg);
player.scale = 0.15;

battery = createSprite(80,50,100,25);
battery.shapeColor = "gold"
}

function draw(){
  if(gameLevel === "stage1"){  
  background(bgImg)
 if(stage1Ecount === 0){
    textSize(25)
    stroke("white");
    fill("white");
    text("Stage1 Cleared!", 600, 300)  
    gameLevel = "stage2";
  }
  spawnEnemy1();
  if(frameCount% 20 === 0){
    spawnBullets()
  }
  if(playerBulletGrp.length!=0){
    for(var j=0; j<enemy1Grp.length; j++){
      for(var k=0; k<playerBulletGrp.length; k++){
       
        if(enemy1Grp[j] && playerBulletGrp[k] && enemy1Grp[j].isTouching(playerBulletGrp[k])){
          score = score + 20;
          destroySound.play()
          enemy1Grp[j].destroy()
          playerBulletGrp[k].destroy()
          stage1Ecount--;
        }
      }
    }
    
   
    }
}
else if(gameLevel === "stage2"){
background(backgroundImg);
  if(frameCount%100 === 0){
//for(var i = 0; i<0; i++ ){
      var e2 = createSprite(Math.round(random(0, 1200)),(Math.round(random(0, 400)), 20, 20));
      e2.addImage(e2Img);
      e2.scale = 0.05;
      e2.velocityX = Math.round(random(-5, 5))
      e2.velocityY = Math.round(random(-5, 5));
     sleep(1000);
      var SwarmE2 = createSprite(Math.round(random(0, 1200)),(Math.round(random(0, 400)), 20, 20));
      SwarmE2.addImage(e2Img);
      SwarmE2.scale = 0.05;
      SwarmE2.velocityX = Math.round(random(-5, 5))
      SwarmE2.velocityY = Math.round(random(-5, 5));
  //  }
  }
}
 
 
  if(keyDown(LEFT_ARROW)){
    player.x = player.x-10;
  }

  if(keyDown(RIGHT_ARROW)){
    player.x = player.x+10;
      }

  if(keyDown(DOWN_ARROW)){
        player.y = player.y+10;
      }
    
  if(keyDown(UP_ARROW)){
        player.y = player.y-10;
          }    
    textSize(25)
    stroke("white");
    fill("white");
    text("Score: " + score, 1100, 50 ) 
          
    drawSprites()

  if(keyWentDown("space")){
    laser = createSprite(player.x, player.y, 3, 15)
    laser.addImage(laserImg)
    laser.scale=0.025;
    laser.velocityY = -5
    laser.lifetime = 120;
    playerBulletGrp.add(laser)
  }    
}

function spawnEnemy1(){
 
  if(frameCount%100===0){
    if(stage1Ecount>0){
    e1 = createSprite(Math.round(random(0, 1250)), -50, 30, 30)
    e1.addImage(enemy1Img);
    e1.velocityY = 5;
    e1.scale = 0.15;
    e1.lifetime = 120;
    enemy1Grp.add(e1);
   
  }
}
 
    player.overlap(e1BulletGrp, function(collector, collected){
      console.log("overlap Done")
      collected.destroy();
      if(battery.width>0){
      battery.width = battery.width - 5;
    }
    })
}
function spawnBullets(){
  for(var e  = 0; e<enemy1Grp.length; e++){
  
  var e1Bullet = createSprite(enemy1Grp[e].x, enemy1Grp[e].y, 10, 10);
  e1Bullet.velocityY = 8;
  e1Bullet.shapeColor = "purple"
  e1Bullet.lifetime = 120;
  e1BulletGrp.add(e1Bullet);
  console.log(e1BulletGrp.length);
  }
}
