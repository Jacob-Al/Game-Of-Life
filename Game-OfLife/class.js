
class Grass {
    constructor(x, y) {
       
        this.x = x;
        this.y = y;
        this.multiply = 0; 

    
    
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

    getDirections(ch) {
        
        var found = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

 
    mul() {
        this.multiply++;
        if (this.multiply == 3) {

            
            var empty = random(this.getDirections(0));
            if (empty) {
                var x = empty[0];
                var y = empty[1];
               
                xotArr.push( new Grass(x, y))

                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }



}



class GrassEater {
    constructor(x, y) {
        
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 3;

    }


    newDirections() {
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

    getDirections(t) {
        this.newDirections();
        var found = [];

        for (let i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    move() {
         
        var cord = random(this.getDirections(0));

        if (cord) {
            var x = cord[0];
            var y = cord[1];
 
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }
    }


    eat() {
       
        var cord = random( this.getDirections(1));

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (let i = 0; i < xotArr.length; i++) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
                break;
            }

            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {

            this.move();
            this.energy--;
            if (this.energy < 3) { 
                this.die();
            }
        }
    }


    mul() {
      
        var cord = random(this.getDirections(0));

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;
   
            eatArr.push(new GrassEater(x, y));

            matrix[y][x] = 2;
            this.multiply = 0;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;

        for (let i = 0; i < eatArr.length; i++) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }

}

class Davachan {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 3;
    }

    newDirections() {
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

    getDirections(t) {
        this.newDirections();
        var found = [];

        for (let i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    move() {
         
        var cord = random(this.getDirections(1));

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        }
    }


    eat() {
       
        var cord = random( this.getDirections(2));

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;


            for (let i = 0; i < eatArr.length; i++) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                    break;
                }
            }

            if (this.multiply == 5) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy < 3) { 
                this.die();
            }
        }
    }


    mul() {
      
        var cord = random(this.getDirections(0));

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            this.multiply++;
            
            davachanArr.push(new Davachan(x, y));

            matrix[y][x] = 3;
            this.multiply = 0;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;

        for (let i = 0; i < davachanArr.length; i++) {
            if (this.x == davachanArr[i].x && this.y == davachanArr[i].y) {
                davachanArr.splice(i, 1);
                break;
            }
        }
    }
}

class bomb{
    constructor(x, y,energy) {
        this.x = x;
        this.y = y;
    }

    newDirections() {
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
    getDirections(t) {
        this.newDirections();
        var found = [];

        for (let i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() { 
        let cord = random(this.getDirections(0));
        let cord2 = this.getDirections(1);
        


        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

        } else if(cord2.length == 8){
            for(let i = 0;i < 8;i++){
                let x = cord2[i][0];
                let y = cord2[i][1];
                matrix[y][x] = 2
                eatArr.push(new GrassEater(x,y));
                for (let b = 0; b < xotArr.length; b++) {
                    if (x == xotArr[b].x && y == xotArr[b].y) {
                        xotArr.splice(b, 1);
                    }
                }
            }
        }
    }
}