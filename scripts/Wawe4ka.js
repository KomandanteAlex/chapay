class Wawe4ka{



    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;

        this.radius = 20;

        this.vx =0;//Math.random()-0.5;
        this.vy =0;// Math.random()-0.5;

        this.mass = 1;
    }


    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

       // ctx.font = "10px Arial";
        //ctx.fillStyle='red';
        //ctx.fillText(this.x+ ":"+this.y,this.x,this.y);
    }

    applyForce(x, y){
        this.vx=x;
        this.vy=y;
    }

    update(){
        this.x+=this.vx;
        this.y+=this.vy;
    }

    intersects(x,y){
        return this.distance(x,y) < this.radius;
    }

    intersectsWith(w2){
       return this.distance(w2.x, w2.y) < this.radius *2;
    }

    distance(x,y){
         return Math.sqrt(Math.pow(this.x - x,2) + Math.pow(this.y-y,2));
    }

    collided(w2){

        //this.color = 'magenta';

        let dist = {
            x: Math.abs(this.x - w2.x),
            y: Math.abs(this.y - w2.y)
        };

        let backdist = Math.sqrt(Math.pow(this.radius + w2.radius, 2) - this.distance(w2.x,w2.y));
        let movementvectorlength = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
        let c_x = dist.x - backdist * (this.vx / movementvectorlength);
        let c_y = dist.y - backdist * (this.vy / movementvectorlength);


        let collisiondist = Math.sqrt(Math.pow(w2.x - c_x, 2) + Math.pow(w2.y - c_y, 2));

        let n_x = (w2.x - c_x) / collisiondist;
        let n_y = (w2.y - c_y) / collisiondist;


        let d = Math.sqrt(Math.pow(this.x - w2.x, 2) + Math.pow(this.y - w2.y, 2));
        let nx = (w2.x - this.x) / d;
        let ny = (w2.y - this.y) / d;
        let p = 2 * (this.vx * nx + this.vy * n_y - w2.vx * nx - w2.vy * n_y) /
            (this.mass + w2.mass);
        let vx1 = this.vx - p * this.mass * n_x;
        let vy1 = this.vy - p * this.mass * n_y;
        let vx2 = w2.vx + p * w2.mass * n_x;
        let vy2 = w2.vy + p * w2.mass * n_y;

        this.vx = vx1;
        this.vy= vy1;

        w2.vx = vx2;
        w2.vy = vy2;

    }

}
