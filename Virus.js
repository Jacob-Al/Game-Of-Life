let LivingCreatures = require('./LivingCreatures')

module.exports = class Virus extends LivingCreatures {
    constructor(x, y) {
        super(x, y)
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
        this.getNewCoordinates()
        return super.chooseCell(character);
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.lenght)];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newvirus = new Virus(newX, newY);
            virusArr.push(newvirus);
            this.energy = 8;
        }
    }

    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.lenght)];
        var emptyCells1 = this.chooseCell(1);
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.lenght)];
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
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.lenght)];
        var emptyCells1 = this.chooseCell(3);
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.lenght)];
        var emptyCells2 = this.chooseCell(4);
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.lenght)];
        var emptyCells3 = this.chooseCell(6);
        var newCell3 = emptyCells3[Math.floor(Math.random() * emptyCells3.lenght)];
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

            if (this.energy >= 9) {
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
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 9) {
                this.mul();
            }
        } else if (newCell2) {
            this.energy++;
            var newX = newCell2[0];
            var newY = newCell2[1];
            matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in everythingEaterArr) {
                if (newX == everythingEaterArr[i].x && newY == everythingEaterArr[i].y) {
                    everythingEaterArr.splice(i, 1);
                    break;
                }
                if (this.energy >= 9) {
                    this.mul();
                }
            }  
         
           
         } else if (newCell3) {
                this.energy++;
                var newX = newCell3[0];
                var newY = newCell3[1];
                matrix[newY][newX] = matrix[this.y][this.x]; ///kam 2 tiv@
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                for (var i in huntArr) {
                    if (newX == huntArr[i].x && newY == huntArr[i].y) {
                        huntArr.splice(i, 1);
                        break;
                    }
                }
                if (this.energy >= 9) {
                    this.mul();
                }
            } else {
                this.move();
            }
        }
    
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in virusArr) {
            if (this.x == virusArr[i].x && this.y == virusArr[i].y) {
                virusArr.splice(i, 1);
                break;
            }
        }

    }
}
