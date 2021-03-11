var balloonImage,backgroundImage,text;
var balloon,height
var database;
var updateHeight,readHeight;

function preload(){
    balloonImage=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-02.png","Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-03.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png","Hot Air Ballon-04.png","Hot Air Ballon-04.png");
    backgroundImage=loadImage("Hot Air Ballon-01.png");  
}
function setup(){
    database=firebase.database();
    createCanvas(1200,600);
    balloon=createSprite(0,0,10,20)
   balloon.scale=0.6;

   var balloonheight=database.ref('balloon/height');
    balloonheight.on("value",readHeight);
}

function draw(){
    background(backgroundImage);
    fill(0);
textSize(15);
    text("Use arrow keys to move the Hot Air Balloon",10,20);

    if(keyDown(LEFT_ARROW)){
       // balloon.x=balloon.x-5
        updateHeight(-5,0);
        balloon.addAnimation("HotAirBallon",balloonImage);
       //changePosition(-10,0);
    }
    
    else if(keyDown(RIGHT_ARROW)){
        //balloon.x=balloon.x+5
        //changePosition(10,0);
        updateHeight(5,0);
        balloon.addAnimation("HotAirBallon",balloonImage);
    }
    else if(keyDown(UP_ARROW)){
        //balloon.y=balloon.y-5
        updateHeight(0,-5);
        balloon.addAnimation("HotAirBallon",balloonImage);
        balloon.scale=balloon.scale -0.008;
        //changePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
        //balloon.y=balloon.y+5
        updateHeight(0,5);
        balloon.addAnimation("HotAirBallon",balloonImage);
        balloon.scale=balloon.scale +0.008;
    }

   // var balloonHeight=database.ref('balloon/height');
//balloonHeight.on("value",readHeight);

    drawSprites();
}


function updateHeight(x,y){
    
    database.ref('balloon/height').set({
        'x':height.x+x,
        'y':height.y+y
    })
}
function readHeight(data){
    height=data.val();
    balloon.x=height.x;
    balloon.y=height.y;
}