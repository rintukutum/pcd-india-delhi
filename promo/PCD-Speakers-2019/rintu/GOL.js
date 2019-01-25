
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function GOL(c, r, scl) {


  this.columns = c;
  this.rows = r;
  this.w = scl;


  // Game of life board
  this.board = new Array(this.columns);
  for (var i = 0; i < this.columns; i++) {
    this.board[i] = new Array(this.rows);
  }

  this.init = function() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.board[i][j] = new Cell(i * this.w, j * this.w, this.w);
      }
    }
  };
  this.init();

  // The process of creating the new generation
  this.generate = function() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.board[i][j].savePrevious();
      }
    }

    // Loop through every spot in our 2D array and check spots neighbors
    for (var x = 0; x < this.columns; x++) {
      for (var y = 0; y < this.rows; y++) {

        /* ------------ DAN's method --------------- */
        /*
        // Add up all the states in a 3x3 surrounding grid
        var neighbors = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            neighbors += this.board[(x+i+this.columns)%this.columns][(y+j+this.rows)%this.rows].previous;
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= this.board[x][y].previous;

        // Rules of Life
        if      ((this.board[x][y].state == 1) && (neighbors <  2)) this.board[x][y].newState(0);
        else if ((this.board[x][y].state == 1) && (neighbors >  3)) this.board[x][y].newState(0);
        else if ((this.board[x][y].state === 0) && (neighbors == 3)) this.board[x][y].newState(1);
        // else do nothing!
        */

        /* ------------ Brain Brain method --------------- */
        /*
				if (this.board[x][y].previous === 0) {
          var firingCount = 0;
          //
          for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
              if (this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous == 1) {
                firingCount++;
              }
            }
          }
          //
          //
          if (firingCount == 2) {
            this.board[x][y].savePrevious();
        		this.board[x][y].newState(1);
        	}else{
            this.board[x][y].savePrevious();
        		this.board[x][y].newState(this.board[x][y].previous);
        	}
        }else if(this.board[x][y].previous === 1){
        	this.board[x][y].savePrevious();
        	this.board[x][y].newState(2);
        }else if(this.board[x][y].previous === 2){
        	this.board[x][y].savePrevious();
        	this.board[x][y].newState(0);
        }

				*/


        /* ------------ Vichniac Vote method --------------- */
        // Count neighbours including me
        var liveCount = 0;
        if (this.board[x][y].previous == 1) {
          liveCount++;
        }
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            if (this.board[(x + i + this.columns) % this.columns][(y + j + this.rows) % this.rows].previous == 1) {
              liveCount++;
            }
          }
        }
        // Am I in the majority?
        if (liveCount <= 4) {
          this.board[x][y].savePrevious();
          this.board[x][y].newState(0);
        } else if (liveCount > 4) {
          this.board[x][y].savePrevious();
          this.board[x][y].newState(1);
        }

        // Swaps rules for 4 and 5
        if ((liveCount == 4) || (liveCount == 5)) {
          let current_state = this.board[x][y].state;
          if (current_state == 0) {
          this.board[x][y].savePrevious();
            this.board[x][y].newState(1);
          } else if (current_state == 1) {
          this.board[x][y].savePrevious();
            this.board[x][y].newState(0);
          }
        }

      }
    }
  };

  // This is the easy part, just draw the cells, fill 255 for '1', fill 0 for '0'
  this.display = function() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.board[i][j].display();
      }
    }
  };
}