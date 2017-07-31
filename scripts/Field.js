class Field{

    constructor(x,y, width, height){
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

    }

    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x,this.y,this.width, this.height);
        ctx.fill();
    }

    update(){

    }

    intersects(){
        return false;
    }

    intersectsWith(w1){

    }

    collided(w1){
        //w1.color= 'black';
    }

}