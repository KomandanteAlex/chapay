`use strict`;



var ctx = document.querySelector(".field").getContext("2d");

// function CircleCreate (name, x, y, r){
//     this.name=name;
//     ctx.beginPath();
//     ctx.arc(x,y,r,0,2*Math.PI);
//     ctx.stroke();
// }


let wawe4ki = [];


wawe4ki.push(new Field(10,10, 350,350));


let radius = 40*2;
let count = 4;
for(let i=1; i<=count; i++){
    wawe4ki.push(new Wawe4ka(i*radius,100,'blue'));
}

let debugInfo = {
    text: 'debug text',
    draw: function(ctx){
        ctx.font = "10px Arial";
        ctx.fillStyle='red';
        ctx.fillText(this.text,10,10);
    },
    intersects: function () {
        return false;
    },
    update: ()=>{}
};

//wawe4ki.push(debugInfo);


function gameIteration(){

    wawe4ki.forEach(w=> w.update());
    collisionDetection();

    clearField();
    wawe4ki.forEach(w=> w.draw(ctx));
}


function collisionDetection(){
    for(let i=0; i< wawe4ki.length; i++){
        let w1 = wawe4ki[i];

        for(let j=i+1; j< wawe4ki.length; j++){
            let w2 = wawe4ki[j];

            if(w1.intersectsWith(w2)){

                w1.collided(w2);

            }

        }

    }
}


function fieldMouseMove(x,y){
    debugInfo.text = x + ':' + y;
    //wawe4ki.forEach(w=>w.move(10,10));
    let w1 = wawe4ki[wawe4ki.length-1];
    w1.vx = (x - w1.x)/100;
    w1.vy = (y - w1.y)/100;


    //wawe4ki.forEach(w=> w.color = 'blue');
    //wawe4ki.filter(w=>w.intersects(x,y)).forEach(w=> w.color = 'red');



}


ctx.canvas.addEventListener('mousemove',(event)=>fieldMouseMove(event.offsetX, event.offsetY));

ctx.canvas.addEventListener('click',(event)=>createWawe4ka(event.offsetX, event.offsetY));


function createWawe4ka(x,y){
    wawe4ki.push(new Wawe4ka(x,y,'green'));
}

// setInterval(function() {
//     gameIteration();
// }, 1000/60);

function repeatOften() {
    gameIteration();
    requestAnimationFrame(repeatOften);
}
repeatOften();



//clearField();
//wawe4ki.forEach(w=> w.draw(ctx));

//w1.draw(ctx);

function clearField() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
