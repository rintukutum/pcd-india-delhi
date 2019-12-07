let mainimage;

let headline='CALL FOR ARTISTS';
let about ='A Day to Celebrate Art, Science and Technology';
let when='01|02|2020 - 02|02|2020';
let details ='processingindia.org/delhi';
let header = 'A R T . S C I E N C E . T E C H N O L O G Y';

let logo;
let venue;

var fade;
var fadeAmount = 1

function preload() {
  logo = loadImage('PCDLogo.png'); 
  venue= loadImage('IGIB.png');
  mainimage= loadImage('image.png');

}

function setup() {
  
  createCanvas(500, 450);
  fade = 0;
}

function draw() {
  
  background(0);
  
  imageMode(CENTER);
  //fade(1, [0]);
  tint(200, fade);
  image(mainimage, width/2, height/2, 476/1.18,377/1.18);
  //image(logo, 20,400, 80,80);
  //image(venue, 400,400, 80,70);
  
  textFont('monospace');
  textAlign (CENTER, CENTER);
  //text (headline, width/2, height/2);
  fill(150);
  
  textSize(16);
  //text (about, width/2, 300);
  
  textSize(16);
  textLeading(10);
  text(when, width/2, height-40);
  fill(10,120,175, fade);
  text(details, width/2, height-20);
  fill(150);
  text(header, width/2, 30);
  
  if (fade<0) fadeAmount=1; 
  if (fade>255) fadeAmount=10; 
 
  fade += fadeAmount; 
 
}

function keyPressed(){
  save("xyz.png");  
}