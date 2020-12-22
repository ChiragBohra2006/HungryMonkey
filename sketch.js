
var monkey , monkey_running;
var banana ,bananaImage;
var rockGroup, treeGroup;
var score;
var ground, groundImage;
var bg, bgImage;
var tree, treeImage;
var rock, rockImage;
var PLAY = 1;
var END = 0;
var gameState = "PLAY"

function preload(){
  
  //load all the images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  rockImage = loadImage("obstacle.png");
  
  groundImage = loadImage("bg (4).jpg");
  
  bgImage = loadImage("bg (5).jpg");
  
  treeImage = loadImage("trees__2_-removebg-preview.png")
 
  
}



function setup() {
  
  //create the background
  bg = createSprite(200, 200, 400, 400);
  bg.addImage("bg",bgImage);
  bg.y = bg.height/2;
 
  //create the monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  //create the ground
  ground = createSprite(295, 355, 900, 10);
  ground.addImage("ground",groundImage);
  ground.velocityX = -5;

  //create the groups
  bananaGroup = new Group();
  rockGroup = new Group();
  treeGroup = new Group();
  
  //create the score
  score = 0;
  
gameState = PLAY;
}


function draw() {
background("white");
 

  if(gameState === PLAY)
    {
      
  if(ground.x<0)
    {
      ground.x = ground.width/2;
    }
 
  if(keyDown("space") && monkey.isTouching(ground))
    {
      monkey.velocityY = -18;
      monkey.rotation = 1;
      monkey.rotationSpeed = 10;
    }
    monkey.velocityY = monkey.velocityY+1;
      
  if(monkey.isTouching(ground))
  {
    monkey.rotation = 0;
  }
  
      
      monkey.collide(ground);
      
      bananas();
      trees();
      rocks();
      
      survivalTime = Math.round(frameCount/frameRate())
  
      if(rockGroup.isTouching(monkey))
        {
          gameState = END;
        }
    }
  
  if(gameState === END)
    {
      treeGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      rockGroup.setLifetimeEach(-1);
      bananaGroup.setVelocityXEach(0);
      rockGroup.setVelocityXEach(0);
      treeGroup.setVelocityXEach(0);
      ground.velocityX = 0;
      monkey.rotation = -135;
      monkey.y = 300;
      monkey.pause();
      
    }

 
 
if(bananaGroup.isTouching(monkey))
  {
    bananaGroup.destroyEach();
    score = score+1;
  }
 
        

  
  

  
  drawSprites();

    fill("black");
    stroke(3);
    textSize(15);
    textFont("Comic sans MS");
    text("Bananas collected: "+ score, 10, 20);

    text("Survival Time: "+ survivalTime, 250, 20)
  
  
}


function rocks()
{
  if(frameCount%300 === 0)
    {
     rock = createSprite(500, 280, 50, 50);
     rock.addImage("rock",rockImage);
     rock.scale = 0.15;
     rock.velocityX = -5;
     rock.lifetime = 150;
     rockGroup.add(rock);
     rock.setCollider("circle",0, 0, 100);
    }
}

function bananas()
{
  if(frameCount%80 === 0)
    {
    banana = createSprite(500, 280, 50, 50);
    banana.addImage("banana",bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 150;
    bananaGroup.add(banana);
    
    }
}

function trees()
{
 if(frameCount%80 === 0)
    {
    tree = createSprite(500, 195, 50, 50);
    tree.addImage("tree",treeImage);
    tree.scale = 0.5;
    tree.velocityX = -5;
    tree.lifetime = 150;
    treeGroup.add(tree);
    
    banana.depth = tree.depth+1;
    monkey.depth = tree.depth+10;
   
  
    }
}
