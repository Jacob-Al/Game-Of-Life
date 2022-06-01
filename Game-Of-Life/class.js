class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}


class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 8
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if(newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x] ///kam 2 tiv@
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if(newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x] ///kam 2 tiv@
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
            if(this.energy >= 12) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}





class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 50
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newPredator = new Predator(newX, newY);
            predatorArr.push(newPredator);
            this.energy = 8
        }
    }

    
move() {
    this.energy--;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);
    var emptyCells1 = this.chooseCell(1);
    var newCell1 = random(emptyCells1);
    if (newCell && this.energy >= 0) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
    } else if (newCell1 && this.energy >= 0) {
      var newX = newCell1[0];
      var newY = newCell1[1];
      matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
      matrix[this.y][this.x] = 0
      for (var i in grassArr) {
        if (newX == grassArr[i].x && newY == grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        }
      }

      matrix[this.y][this.x] = 1;

      var newGrass = new Grass(this.x, this.y, 1);
      grassArr.push(newGrass);

      this.x = newX;
      this.y = newY;
    } else {
      this.die();
    }

  }

    eat() {
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if(newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x] 
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            
            if(this.energy >= 12) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}


class Everythingeater {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.energy = 8;
      this.directions = [];
    }
    getNewCoordinates() {
      this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1]
      ];
    }
    chooseCell(character) {
      this.getNewCoordinates();
      var found = [];
      for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
          if (matrix[y][x] == character) {
            found.push(this.directions[i]);
          }
        }
      }
  
      return found;
    }
  
    mul() {
      var emptyCells = this.chooseCell(0);
      var newCell = random(emptyCells);
  
      if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 4;
  
        var neweverythingeater = new Everythingeater(newX, newY);
        everythingEaterArr.push(neweverythingeater);
        this.energy = 8;
      }
    }
  
    move() {
      this.energy--;
      var emptyCells = this.chooseCell(0);
      var newCell = random(emptyCells);
      if (newCell && this.energy >= 0) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
      } else {
        this.die();
      }
    }
  
    eat() {
      var emptyCells = this.chooseCell(2);
      var newCell = random(emptyCells);
      var emptyCells1 = this.chooseCell(1);
      var newCell1 = random(emptyCells1);
      if (newCell) {
        this.energy++;
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
        for (var i in grassEaterArr) {
          if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
            break;
          }
        }
  
        if (this.energy >= 12) {
          this.mul();
        }
      } else if (newCell1) {
        this.energy++;
        var newX = newCell1[0];
        var newY = newCell1[1];
        matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
        for (var i in grassArr) {
          if (newX == grassArr[i].x && newY == grassArr[i].y) {
            grassArr.splice(i, 1);
            break;
          }
        }
  
        if (this.energy >= 12) {
          this.mul();
        }
      } else {
        this.move();
      }
    }
    die() {
      matrix[this.y][this.x] = 0;
      for (var i in everythingEaterArr) {
        if (
          this.x == everythingEaterArr[i].x &&
          this.y == everythingEaterArr[i].y
        ) {
          everythingEaterArr.splice(i, 1);
          break;
        }
      }
    }
  }

  
  
  
  
  class Hunter {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.energy = 10;
      this.directions = [];
    }
    getNewCoordinates() {
      this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1]
      ];
    }
    chooseCell(character) {
      this.getNewCoordinates();
      var found = [];
      for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
          if (matrix[y][x] == character) {
            found.push(this.directions[i]);
          }
        }
      }
  
      return found;
    }
  
    mul() {
      var emptyCells = this.chooseCell(0);
      var newCell = random(emptyCells);
  
      if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 5;
  
        var newHunter = new Hunter(newX, newY);
        hunterArr.push(newHunter);
        this.energy = 8;
      }
    }
  
    move() {
      this.energy--;
      var emptyCells = this.chooseCell(0);
      var newCell = random(emptyCells);
      if (newCell && this.energy >= 0) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
      } else {
        this.die();
      }
    }
  
    eat() {
      var emptyCells = this.chooseCell(3);
      var newCell = random(emptyCells);
      var emptyCells1 = this.chooseCell(1);
      var newCell1 = random(emptyCells1);
      if (newCell) {
        this.energy--;
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
        for (var i in predatorArr) {
          if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
            predatorArr.splice(i, 1);
            break;
          }
        }
  
        if (this.energy >= 12) {
          this.mul();
        }
      } else if (newCell1) {
        this.energy++;
        var newX = newCell1[0];
        var newY = newCell1[1];
        matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
        for (var i in grassArr) {
          if (newX == grassArr[i].x && newY == grassArr[i].y) {
            grassArr.splice(i, 1);
            break;
          }
        }
  
        if (this.energy >= 12) {
          this.mul();
        }
      } else {
        this.move();
      }
    }
    die() {
      matrix[this.y][this.x] = 0;
      for (var i in hunterArr) {
        if (
          this.x == hunterArr[i].x && this.y == hunterArr[i].y
        ) {
          hunterArr.splice(i, 1);
          break;
        }
      }
    }
  }
  
  
 



