// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


function Cell(x_, y_, w_) {
  this.x = x_;
  this.y = y_;
  this.w = w_;

  this.life = 0;

  //this.state = Math.floor(random(2));
  if(random(1) < startcell_cluster_threshold){
  	  this.state = 0;
  }else{
    this.state = 1;
  }

  this.previous = this.state;

  this.savePrevious = function() {
		this.previous = this.state;
  };

  this.newState = function(s) {
    //this.life = 0;
    this.state = s;
  };

  this.display = function() {
    /*
    if (this.previous === 0 && this.state == 1) fill(0,0,255);
    else if (this.state == 1) fill(0);
    else if (this.previous == 1 && this.state === 0) fill(255,0,0);
    else fill(255);
    */
    push();
    var val = 100;
    if (this.previous == 1) {
    	val = 100;
    }else if(this.previous==2){
      val = 0;
    }else{
      val = 20;
    }

    if(this.life < 100)
      this.life++;



    //tint(map(val, 0, 100, 0, 255));
    tint(255, map(val, 0, 100, 10, 255));
    image(imgChunks[this.x/this.w][this.y/this.w], (this.x/this.w)*spacing, (this.y/this.w)*spacing, scale, scale);
    pop();

  };
}