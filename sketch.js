var player, enemy1
var playerImg, enemy1Img, bgImg
var enemy1Grp, playerBulletGrp

function preload(){
playerImg = loadImage("images/Player (1).png")
enemy1Img = loadImage("images/Player (2).png")
bgImg = loadImage("images/Space.png")
}

function setup(){
createCanvas(1250, 600)
enemy1Grp = new Group()
playerBullet = new Group()
player = createSprite(625, 500, 50, 50);
player.addImage(playerImg);
player.scale = 0.15;
}

function draw(){
  background(bgImg)
 spawnEnemy1()
  if(keyDown(LEFT_ARROW)){
    player.x = player.x-10;
  }

  if(keyDown(RIGHT_ARROW)){
    player.x = player.x+10;
      }
      drawSprites()

  if(keyWentDown("space")){
    var playerBullet = createSprite(player.x, player.y, 10, 10)
    playerBullet.velocityY = -5
    playerBullet.shapeColor = "gold"
    playerBulletGrp.add(playerBullet)
  }    

}

function spawnEnemy1(){
  if(frameCount%100===0){
    var e1 = createSprite(Math.round(random(0, 1250)), -50, 30, 30)
    e1.addImage(enemy1Img);
    e1.velocityY = 5 
    e1.scale = 0.2;
    enemy1Grp.add(e1)

    if(playerBulletGrp.isTouching(e1)){
      e1.destroy()
    }
  }
}