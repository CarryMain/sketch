const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.backgroundColor = 'white';
const clear = document.getElementById('clear');

const colorPicker = document.getElementById('colorPicker');
const dropdown = document.querySelector(".dropdown");
const colorDisplay = document.querySelector(".dropbtn");

dropdown.addEventListener("click", () => {
  colorPicker.classList.toggle("dropdown-active");
});

colorPicker.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    colorDisplay.innerHTML = event.target.innerHTML;
  }
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


let isDrawing = false;

canvas.addEventListener('mousedown', () => {
  isDrawing = true;
  ctx.beginPath();
});

canvas.addEventListener('mousemove', (event) => {
  if (!isDrawing) return;
  const x = event.clientX - canvas.getBoundingClientRect().left;
  const y = event.clientY - canvas.getBoundingClientRect().top;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  canvas.style.cursor = 'default';
});

const removeCanvas = () => {
  clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
};
choiceColor();
removeCanvas();

