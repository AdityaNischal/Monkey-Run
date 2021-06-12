var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Monkey, monkey_running, monkey_collided,monkey_jumped;
var banana, bananaImg, bananaG;
var rock, rockImg, rockG;
var bgImg;
var ground, groundImg, invG;
var gameOver, gameOverImg;
var restart,restartImg;
var BananaEat,BananaEatImg;
var scoreBoard,scoreBoardImg;

var survival = 0;
var bananaeat = 0;


function preload() {


  bgImg = loadImage("bg1j.jpg")

  groundImg = loadImage("g1.jpg")

  gameOverImg = loadImage("bo.png")

  BananaEatImg = loadImage("scoreB.jpg")

  scoreBoardImg = loadImage("scoreB.jpg")
 
  restartImg=loadImage("res.jpg")

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  monkey_collided = loadAnimation("sprite_2.png")
  
  monkey_jumped = loadAnimation("sprite_8.png")

  bananaImg = loadImage("ban.jpg");
  rockImg = loadImage("sto-1.jpg");

}



function setup() {
  createCanvas(windowWidth, windowHeight)


  Monkey = createSprite(80, 410);
  Monkey.addAnimation("monkey_running", monkey_running);
  Monkey.addAnimation("monkey_collided", monkey_collided);
 
  Monkey.scale = 0.1;
  Monkey.debug = false;



  ground = createSprite(0, 730);
  ground.addImage(groundImg);
  ground.scale = 0.9999;
  ground.x = ground.width /2;
  ground.depth = Monkey.depth;
  Monkey.depth = Monkey.depth + 1;

  gameOver = createSprite(680, 180);
  gameOver.addImage(gameOverImg)
  gameOver.scale = 1.2
  gameOver.visible = false;
 
  restart=createSprite(685,340)
  restart.addImage(restartImg)
  restart.scale=0.13
  restart.visible = false;

  BananaEat = createSprite(1250,30);
  BananaEat.addImage(BananaEatImg);
  BananaEat.scale = 0.45

  scoreBoard = createSprite(120,30);
  scoreBoard.addImage(scoreBoardImg);
  scoreBoard.scale = 0.45

  invG = createSprite(300, 573, 800, 10)
  invG.visible = false


  rockG = new Group();
  bananaG = new Group();

}


function draw() {
  background(bgImg)

  if (gameState === PLAY) {

    ground.velocityX = -(6 + 4 / 50)

    if (keyDown("space") && Monkey.y >= 100) {

      Monkey.velocityY = -6

     

    }
    
    

    Monkey.velocityY = Monkey.velocityY + 0.8




    if (ground.x <595) {
      ground.x = ground.width / 2
    }

    if (bananaG.isTouching(Monkey)) {
      bananaG.destroyEach();
      bananaeat = bananaeat + 1
      Monkey.scale = Monkey.scale + 0.01
    }


    if (rockG.isTouching(Monkey)) {
      Monkey.scale = 0.1
    }
    if (rockG.isTouching(Monkey)) {
      gameState = END;
      Monkey.scale = 0.1
    }
   
    ban();
    rock();

  } else if (gameState === END) {

    gameOver.visible = true;
   
    restart.visible = true;

   
    Monkey.velocityY = Monkey.velocityY + 0.8


    Monkey.changeAnimation("monkey_collided", monkey_collided)


    ground.velocityX = 0;
    survival = 0;
    bananaeat = 0;

    rockG.setVelocityXEach(0);
    bananaG.setVelocityXEach(0);


    rockG.setLifetimeEach(-1);
    bananaG.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset()
      console.log("play")
      }
  }




  Monkey.collide(invG);










 
  drawSprites();


  fill(255)
  textSize(24)
  text("Survival:" + survival, 54, 54);
  survival = survival + Math.round(getFrameRate() / 60)
  text("Banana Eat=" + bananaeat, 1180, 52)

}

function rock() {
  if (frameCount % 120 === 0) {
    var rock = createSprite(1200, 524)
    rock.addImage(rockImg)
    rock.scale = 0.4;
    rock.velocityX = ground.velocityX
    rock.lifeTime = 200
    rock.debug = false;
    rock.setCollider("rectangle", 20, 30, 380, 300)


    rockG.add(rock);
  }
}

function ban() {
  if (frameCount % 200 === 0) {
    var banana = createSprite(1500, 200);
    banana.addImage(bananaImg);
    banana.scale = 0.07;
    banana.velocityX = ground.velocityX;
    banana.y = Math.round(random(300, 340))
    banana.lifeTime = 900

    banana.depth = gameOver.depth;
    gameOver.depth = gameOver.depth + 1



    bananaG.add(banana);
  }
}
function reset(){
  gameState = PLAY
  gameOver.visible = false;
  restart.visible = false;
  survival = 0;
  bananaeat = 0
 rockG.destroyEach()
 bananaG.destroyEach()
}
  
  
