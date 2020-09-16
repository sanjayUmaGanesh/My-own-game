var background1,backgroundImg,invisibleGround;
var player,playerImg,cmp,cmpimg,ob,ob1,obG,cmpG,b,bmig,Bg;
var gamestate = PLAY
var PLAY = 1
var END = 0
var WON = 2


function preload(){  
  backgroundImg = loadImage("2dplatform_0.webp");
  playerImg = loadImage("maan.png");
  ob1 = loadImage("ob2.png");
  cmpimg = loadImage("theif.png");
  bimg = loadImage("booster.png");
}
  
function setup(){
  createCanvas(600,600)
  background1 = createSprite(400,500,10,10);
  background1.addImage("hallway",backgroundImg);
  background1.scale = 1;
  background1.velocityX = -10;
  
  player = createSprite(100,340,10,10);
  player.addImage("cop",playerImg);
  player.scale = 0.2;
  player.debug = false;
  player.setCollider("circle",20,0,220)
  
  invisibleGround = createSprite(300,390,600,10);
  invisibleGround.visible = false
  
    cmp = createSprite(400,353,10,10);
    cmp.addImage("theif",cmpimg);
    cmp.scale = 0.2
    cmp.velocityX = -0.2; 
    cmp.debug = false;
    //cmp.setCollider("rectangle", 0,0,600,100);
    
  gamestate = PLAY;
  
  
  obG = new Group();
  cmpG = new Group();
  Bg = new Group();
 
}

function draw(){
  background ("white")
  
  player.collide(invisibleGround);
  player.velocityY = player.velocityY + 0.8;
  cmp.collide(invisibleGround);
  cmp.velocityY = cmp.velocityY + 0.8;
  
  cmp.depth = cmp.depth + 1
  
  if(gamestate === PLAY){
    
      if(background1.x === 30){
          background1.x = 400; 
        }
 
  
  
      if(keyDown("space") && player.y >340.6){
         player.velocityY = -19;
        }
      if(player.isTouching(obG)){
         gamestate = END; 
      }
      if(player.isTouching(cmp)){
         gamestate = WON;
      }
      if(cmp.isTouching(obG)){
         cmp.velocityY = -18;
      }
     // console.log(cmp.x);
      if(Bg.isTouching(player)){
         Bg.destroyEach()
         cmp.velocityX = cmp.velocityX - 0.2;
      }
      GiveBooster();
      throwBins();
  }
  if(gamestate === END){
     obG.destroyEach()
     player.destroy()
     cmp.destroy()
     background1.destroy();
     textSize(30);
     Bg.destroyEach();
     fill("red");
     text("GAME OVER", 200,300);
  }
  if(gamestate === WON){
     obG.destroyEach()
     player.destroy()
     cmp.destroy()
     background1.destroy();
     textSize(30);
     fill("red");
     Bg.destroyEach()
     text("YOU WON", 200,300) 
  }
  
  drawSprites();
}
function throwBins(){
  if(frameCount % 80 === 0){
    ob = createSprite(610,350,10,10);
    ob.velocityX = -5;
    ob.addImage("ob",ob1);
    ob.scale = 0.3;
    ob.debug = false;
    obG.add(ob);
    ob.lifetime = 120;
    
  }
}
 function GiveBooster(){
    x = random(20,100)
   if(frameCount % 200 === 0){
     b = createSprite(600,270,10,10);
     b.velocityX = -5;
     b.addImage("booster",bimg);
     b.scale = 0.3
     b.lifetime = 120
     Bg.add(b);
     
   }
 }

    
  