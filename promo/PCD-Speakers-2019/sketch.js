//GIF FRAMES
let gifFileName = "pcd2019-speaker-000.gif";
let frames = 0;
let totalFrames = 120;
let recording = false;
let fullCanvas = null;
let gifInfo = null;
let capturer = null;

//IMAGES
let photoFileName = "nat512Artboard_1.png";
let img, photo;
let maskImage;

// TEXT
let c = "COMPUTATIONAL";
let d = " ethnography ";
let day = "DAY 9 ";
let date = "27.01.2019";
let m = "ARTIST";
let name = "NATASHA SINGH";
let domainXPost = 50;
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


function preload(){
	// LOAD STATIC ELEMENTS
  ibmFont = loadFont('IBMPlexSans-SemiBold.ttf');
  verFont = loadFont('verdana.ttf');
  img = loadImage ("PCD_Logo.png");
  photo = loadImage(photoFileName);
}


function setup() {
  //
  fullCanvas = createCanvas(400, 520);
  //
  background(200);
  smooth(6);
	//

	// PHOTO CIRCULAR MASK
	maskImage = createGraphics(512,512);
  maskImage.ellipse (256,256, 512,512);
  photo.mask(maskImage);

  //
  setupGif();
}

function createGif() {
  capturer.start();
  //
  recording = !recording;
  if (!recording) {
    capturer.stop();
    gifInfo.textContent = 'Gif rendered, please wait...';
  }
}

function draw() {

	background(200);

  //ARTIST IMAGE
	image(photo, 15,240, 100, 100);

  //
  //PCD LOGO
  image (img,45,70);

	//
	//
	drawTextElements();

	//
	//
	drawBlinkingCursor();


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

/*
function downloadGif(){
  capturer.save();
}
*/

function drawBlinkingCursor(){
	push();
	if (frameCount%50 == 0) {
		if (on)
			cursorColor = color(255);
		else
			cursorColor = color(200);
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
	rect (300,310,10,10);
	pop();
}


function drawTextElements(){
	//
  // DAY
	textSize(14);

  fill(91,0,180);
  noStroke();
  rect (15,15,100,40);

  fill(255);
  text (day,20,20,100,100);
  text ("PCD@Delhi ", 20, 50, 100);

  // TOPIC
  textSize(35);
  textFont (ibmFont);
  drawText (c, 20, 140, -1);
  text ('+', 20, 170);
  text (d, d_start_pos, 170);


	// DATE
  textSize(14);
  textFont(verFont);
  drawText(date, 200, 50, 15);
  drawText(m, fontXPos, 400, 12);
  drawText(name, fontXPos, 380,15);

	// LOCATION
	let k = ("+91 9538334353  110070, New Delhi");
  text(k, 20, 450, 140,100);
  dw = textWidth (d);

	// HASHTAG
	textFont(verFont);
	//textSize(16);
	let x = "#pcd2019";
	text (x, 280, 330);
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
function drawText(message, fontXPos, fontYPos, charSpacing){
  for (let i = 0; i < message.length; i++) {
    text(message.charAt(i),fontXPos,fontYPos);
    if(charSpacing != -1)
      fontXPos += charSpacing;
    else
      fontXPos += textWidth(message.charAt(i));
  }
}