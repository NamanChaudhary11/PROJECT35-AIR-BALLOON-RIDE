var backgroundImg,database;
var balloon,bImg,balloonImg;

var position;

function preload(){
 backgroundImg=loadImage("backgroundimage.png");
 balloonImg= loadImage("HotAirBallon-02.png","HotAirBallon-03.png","HotAirBallon-04.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1017,625);
  balloon=createSprite(450, 300, 10, 10);
  balloon.addImage(balloonImg);
  balloon.scale=0.5;
  balloon.addAnimation("bImg",balloonImg);
 
  
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);

}
function updatePosition(x,y){
  database.ref('balloon/position').set({
      'x':position.x+x,
      'y':position.y+y
  })
 }
 
function readPosition(data){
      position= data.val();

      balloon.x =position.x;
      balloon.y =position.y;
}

function showError(){
  console.log("Error in writing to database");
}

function draw() {
  background(backgroundImg);  
  strokeWeight(3);
  stroke("orange");
  fill("red");
  textSize(30);
  text("'You Can Make The Hot Air Balloon Fly Using Arrow Keys ..",20,30);
  text("And That Was Super Cool For Me And For You It Will . Also'",20,80);

  if (position!==undefined){

    if(keyDown(LEFT_ARROW)){
        balloon.x=balloon.x-10;
        updatePosition(-10,0);
        balloon.addAnimation("bImg",balloonImg);
        balloon.scale=balloon.scale-0.01;
    }
    else if(keyDown(RIGHT_ARROW)){
      balloon.x=balloon.x+10;
        updatePosition(10,0);
        balloon.addAnimation("bImg",balloonImg);
        balloon.scale=balloon.scale+0.01;
    }
    else if(keyDown(UP_ARROW)){
      balloon.y=balloon.y-10;
        updatePosition(0,-10);
        balloon.addAnimation("bImg",balloonImg);
        balloon.scale=balloon.scale-0.01;
    }
    else if(keyDown(DOWN_ARROW)){
      balloon.y=balloon.y+10;
        updatePosition(0,10);
        balloon.addAnimation("bImg",balloonImg);
        balloon.scale=balloon.scale+0.01;
    }
  drawSprites();
}
}


