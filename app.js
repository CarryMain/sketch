const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.backgroundColor = 'white';
const clear = document.getElementById('clear');

const colorPicker = document.getElementById('colorPicker');
const dropdown = document.querySelector(".dropdown");
const colorDisplay = document.querySelector(".dropbtn");

const eraser = document.getElementById('eraser');
let isDrawing = false;
let isEraser = false;

eraser.addEventListener('click',() => {
    if(!eraser.classList.contains('active')) {
        eraser.classList.add('active');
        isEraser = true;
        ctx.fillStyle = 'white';
    } 
    else {
        eraser.classList.remove('active');
        isEraser = false;
        ctx.fillStyle = color;
    }
  });

canvas.addEventListener('mousedown',(event) => {
    if(isEraser) {
      ctx.beginPath();
      ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    } 
    else {
      isDrawing = true;
      ctx.beginPath();
    }
  });
  
canvas.addEventListener('mousemove', (event) => {
    if(isEraser) {
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;
      ctx.lineTo(x,y);
      ctx.stroke();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 10;
    }
    else if (isDrawing) {
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  });
  
  canvas.addEventListener('mouseup', () => {
    if(isEraser) {
      isEraser = false;
      ctx.closePath();
    } else {
      isDrawing = false;
      canvas.style.cursor = 'default';
    }
  });

dropdown.addEventListener("click", () => {
  colorPicker.classList.toggle("dropdown-active");
});

colorPicker.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    colorDisplay.innerHTML = event.target.innerHTML;
    if(!isEraser) {
        ctx.fillStyle = currentColor;
  }}
});

const choiceColor = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'black'];
  colors.forEach((color) => {
    const button = document.createElement('button');
    button.textContent = color;
    button.style.background = color;
    if(color === 'black') {
        button.style.color = 'white';
    }
    button.addEventListener('click', () => {
      ctx.fillStyle = color;
    });
    colorPicker.appendChild(button);
  });
};

const removeCanvas = () => {
  clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
};

choiceColor();

removeCanvas();


