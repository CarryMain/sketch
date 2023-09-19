const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.backgroundColor = 'white';
const canvasSize = document.getElementById('canvas-size');
const canvasSizeDisplay = document.getElementById('canvas-size-display');

const content = {
    x:0,
    y:0,
    width: canvas.width * 0.5,
    height: canvas.height * 0.5,
};

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(content.x, content.y, content.width, content.height);
}

draw();


canvasSize.addEventListener('input',() => {
    const newSize = canvasSize.value;
    canvasSizeDisplay.innerText = `${canvasSize.value}x${canvasSize.value}`;
    canvas.width = newSize;
    canvas.height = newSize;
    draw();
})










let isDrawing = false;
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    ctx.beginPath();
})

const setColor = () => {
    canvas.addEventListener('mousemove', (event) => {
        if(!isDrawing) return;
        const x = event.clientX - canvas.getBoundingClientRect().left;
        const y = event.clientY - canvas.getBoundingClientRect().top;
        ctx.fillStyle = getRandomColor();
        ctx.beginPath();
        ctx.arc(x,y,5,0,2 * Math.PI);
        ctx.fill();
        updateCursor(event);
    })
}
canvas.addEventListener('mouseup',() => {
    isDrawing = false;
    canvas.style.cursor = 'default';
})

const getRandomColor = () => {
   let colors = "0123456789ABCDEF";
   let color = '#';
   for(let i=0;i<6; i++) {
    color+= colors[Math.floor(Math.random()*16)]
   }
   return color;
}

const updateCursor = (e) => {
    const cursorColor = getRandomColor();
    canvas.style.cursor = `url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="5" fill="${cursorColor}"/></svg>') 10 10, auto`;
}

setColor();


