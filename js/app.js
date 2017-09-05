
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.reset();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed;
    this.y = 79 * this.row;
    if (this.x > 500) {
      this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  this.x = -100;
  this.y = 30 * this.row;
  this.row = Math.floor((Math.random() * 3) + 1);
  this.speed = Math.floor((Math.random() * 4) + 3);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.reset();
  this.sprite = "images/char-boy.png";
};


Player.prototype.update = function(dt) {
   this.checkCollisions();
  if (this.moveable) {
    this.x = 101 * this.col;
    this.y = 83 * this.row;
  }
  if (this.y < 83 && this.moveable) {
    this.moveable = false;
    return true;
  }

  //return false;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
  this.col = Math.floor((Math.random() * 4) + 0);
  this.row = 5;
  this.moveable = true;
}

Player.prototype.handleInput = function(key) {
  switch (key) {
    case "right":
      this.col++;
      break;
    case "left":
      this.col--;
      break;
    case "up":
      this.row--;
      break;
    case "down":
      this.row++;
      break;
  }
  if (this.row < 0) this.row = 0;
  if (this.row > 5) this.row = 5;
  if (this.col < 0) this.row = 0;
  if (this.row > 4) this.row = 4;
};

Player.prototype.checkCollisions = function() {
  for (i = 0; i < 4 ; i++) {
    if (allEnemies[i].x < this.x + 50 && allEnemies[i].x + 50 > this.x &&
        allEnemies[i].y < this.y + 55 && 55 + allEnemies[i].y > this.y) {
          console.log("Collision");
        this.reset();
      }
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 0; i < 4; i++) {
  allEnemies.push(new Enemy());
}

var player = new Player();
//Player { col: 3 , row:5 ,movable: true, x:100 , y:100}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
