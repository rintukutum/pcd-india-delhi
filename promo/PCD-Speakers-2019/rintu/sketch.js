
//
// An implementation of Game of Life CA
// Extending GOL implementation from The Nature of Code
// with an addition of "The Vichniac Vote" and "Brain's Brain" rules
// using p5.Image.get to change parts of image(i.e. PCD_LOGO) with the state of the cell
//
// Implemented for PCD_Delhi 2019
// #PCD2019
//




//GIF FRAMES
//let gifFileName = "pcd2019-speaker-000.gif";
//let gifFileName = "pcd2019-speaker-rintu-updated.gif";
let gifFileName = "pcd2019-speaker-mitali-updated.gif";
let frames = 0;
let totalFrames = 120;
let recording = false;
let fullCanvas = null;
let gifInfo = null;
let capturer = null;
//
// IMAGES
//let photoFileName = "nat512Artboard_1.png";
//let photoFileName = "mm-photo.jpg";
let photoFileName = "rintu-photo.png";
let img, photo;
let maskImage;
let logo_x, logo_y;
let somewhere = 1024;


// COLUMNS
let cols;
let rows;
let scale = 6;
let spacing = 6;

let play = false;

// GOL
var gol;
var startcell_cluster_threshold = 0.57;

// SCALE
let this_scale = 1.0;

// TEXT
let domainXPost = 50;
let c = "COMPUTATIONAL";
// let d = " ethnography ";
//let d = " genomics ";
let d = " biology ";
//let d = " ethnography ";
let day = "2 DAYS TO GO";
let date = "27.01.2019";
let m = "DATA SCIENTIST";
//let m = "GENOMIC SCIENTIST";
//let m = "ARTIST";
// let name = "NATASHA SINGH";
let name = "RINTU KUTUM";
//let name = "NATASHA SINGH";
let d_start_pos = 40;
let dw;

// FONTS
let font;
let ibmFont, verFont;
let fontSize = 14;
let fontXPos = 20;

// CURSOR BLINK
let on = true;
let cursorColor = 255;

let imgChunks;



function preload() {
  // LOAD STATIC ELEMENTS
  ibmFont = loadFont('IBMPlexSans-SemiBold.ttf');
  verFont = loadFont('verdana.ttf');
  img = loadImage("PCD_Logo_512.png");
  photo = loadImage(photoFileName);
}


function mousePressed(){
  logo_x = (mouseX -  width/2);
  logo_y = (mouseY - height/2);
}

function keyPressed(){
  this_scale += 0.1;
}

function setup() {

  let r = random(255);
  //console.log(r);
  logo_x = random(-somewhere, somewhere);// * mouseX / 1024;
  logo_y = random(-somewhere, somewhere);// * mouseY / 1024;

  //
  fullCanvas = createCanvas(400, 520);
  //

  console.log('Logo dimension: ' + img.width + ' x ' + img.height);

  cols = int(img.width / (scale));
  rows = int(img.height / (scale));

  gol = new GOL(cols, rows, scale);

  //
  fullFrame = createCanvas(400, 520);//400, 520
  //
  background(50);
  smooth(6);
  //

  // PHOTO CIRCULAR MASK
  maskImage = createGraphics(512, 512);
  maskImage.ellipse(256, 256, 512, 512);
  photo.mask(maskImage);

  // Logo image chunks
  imgChunks = [];
  let chunkMaskImage = createGraphics(scale, scale);
  chunkMaskImage.ellipse(scale/2, scale/2, scale*1.5, scale*0.7);
  for(let i=0; i < cols; i++){
    imgChunk_row = [];
    for(let j=0; j < rows; j++){
      let image_chunk = img.get(i*scale, j*scale, scale, scale);
      image_chunk.mask(chunkMaskImage);
      //
      let val = 0;
      imgChunk_row.push(image_chunk);
    }
    imgChunks.push(imgChunk_row);
  }

  //
  //
  //
  console.log('Chunks dimension: ' + imgChunks.length + ' x ' + imgChunks[0].length);

  //
  setupGif();

}

function keyPressed(){
  if(key == 'c'){
    createGif();
  }

  if(key == ' '){
    play = true;
  }
}

function draw() {

  background(50);

  //
  //PCD LOGO
  //tint(100);
  //image(img, 0, 0);
  //
  // PCD LOGO GOL
  push();
  translate(logo_x, logo_y);
  //scale(this_scale);
  if(play){
    if (frameCount%3 == 0)
      gol.generate();
  }
  gol.display();
  pop();


  //ARTIST IMAGE
  image(photo, 15, 240, 100, 100);


  //
  //
  drawTextElements();

  //
  //
  drawBlinkingCursor();
	//

  //
  //testImageChunks();
  //

  if (recording) {
    frames++;
    gifInfo.textContent = 'Adding frame ' + frames;
    capturer.capture(fullCanvas.elt);
  }

  if(recording && frames > totalFrames){
    recording = false;
    frames = 0;
    capturer.stop();
    gifInfo.textContent = 'Gif rendered, please wait...';
    capturer.save( function(blob) {
      console.log('finished');
      console.log(URL.createObjectURL(blob));
      //
      document.getElementById("link-seperator").style.visibility = "visible";
      document.getElementById("download-link").style.visibility = "visible";
      //
      let url = window.URL.createObjectURL(blob);
      let download = document.getElementById("download-link");
      download.href = url;
      download.target = '_blank';
      download.download = gifFileName;
      //
      //
      setupGif();
      //
    } );
  }

}

function createGif() {
  //
  play = true;
  //
  capturer.start();
  //
  recording = !recording;
  if (!recording) {
    capturer.stop();
    gifInfo.textContent = 'Gif rendered, please wait...';
  }
}

function testImageChunks(){
  //
  //
  push();
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      fill(255);
      //rect(x * spacing, y * spacing, scale, scale);
			//image(imgChunks[x][y], x*spacing, y*spacing, scale, scale);
    }
  }
  pop();
  //
  //
}

function drawBlinkingCursor(){
  push();
  if (frameCount%50 == 0) {
    if (on)
      cursorColor = color(255);
    else
      cursorColor = color(50);
    on = !on;
  }
  fill(cursorColor);
  rectMode(CENTER);
  noStroke();
  rect (d_start_pos + dw*2.25, 160, 2, 27); //needs fixing

  if(on)
    fill(91,0,180);
  else
    fill(255,0,180);

  noStroke();
  rect (300,430,10,10);
  pop();
}


function drawTextElements(){
  //
  // DAY
  textSize(14);

  fill(91,0,180);
  noStroke();
  rect (15,15,120,40);

  fill(255);
  text (day,20,20,120,120);
  text ("PCD@Delhi ", 20, 50, 120);

  // TOPIC
  textSize(35);
  textFont (ibmFont);
  drawText (c, 20, 140, 1);
  text ('+', 20, 170);
  text (d, d_start_pos, 170);


  // DATE
  textSize(14);
  textFont(verFont);
  drawText(date, 200, 50, 1.5);
  drawText(m, fontXPos, 400, 1.2);
  drawText(name, fontXPos, 380,1.5);

  // LOCATION
  let k = ("+91 9538334353  110070, New Delhi");
  text(k, 20, 450, 140,100);
  dw = textWidth (d);

  // HASHTAG
  textFont(verFont);
  //textSize(16);
  let x = "#pcd2019";
  text (x, 280, 450);
}


function setupGif() {
  gifInfo = document.getElementById("info");

  capturer = new CCapture( {
      framerate: 60,
      format: 'gif',
      workersPath: './js_worker/',
      verbose: false
  } );
}


//for character spacing
function drawText(message, fontXPos, fontYPos, charSpacing) {
  for (let i = 0; i < message.length; i++) {
    text(message.charAt(i), fontXPos, fontYPos);
    fontXPos += textWidth(message.charAt(i)) * charSpacing;
  }
}