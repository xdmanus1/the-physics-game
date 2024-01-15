const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const restartButton = document.getElementById('restart-button');
const winModal = document.getElementById('win-modal');
const winModalRestartButton = document.getElementById('win-modal-restart');
const starContainer = document.querySelector('.star-container');
const colorModal = document.getElementById('colorModal');
const openColorModalButton = document.getElementById('openColorModal');
const saveColorsButton = document.getElementById('saveColors');
const colorInputs = document.querySelectorAll('.color-input input');

let currentColor = 1;
let gameOver = false;

const colorLimits = {
    1: 25,
    2: 25,
    3: 25,
    4: 25,
};

const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let colors = [
    '#000000',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#800080'
];

const cellSize = 50;
const mapWidth = map[0].length;
const mapHeight = map.length;

canvas.width = cellSize * mapWidth;
canvas.height = cellSize * mapHeight;

function drawCell(x, y) {
    ctx.fillStyle = colors[map[y][x]];
    ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
}

function drawMap() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            drawCell(x, y);
        }
    }
}

function checkGameOver(x, y, color) {
    if (x > 0 && map[y][x - 1] === color) {
        return true;
    }

    if (x < mapWidth - 1 && map[y][x + 1] === color) {
        return true;
    }

    if (y > 0 && map[y - 1][x] === color) {
        return true;
    }

    if (y < mapHeight - 1 && map[y + 1][x] === color) {
        return true;
    }

    return false;
}

function checkGameWon() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            if (map[y][x] === 0) {
                return false;
            }
        }
    }
    return true;
    winSound.play();
}

function fillCell(x, y, color) {
    if (gameOver || color === 0 || colorLimits[color] <= 0) {
        return;
    }

    const currentColorCell = map[y][x];
    if (currentColorCell !== color) {
        colorLimits[currentColorCell]++;
        colorLimits[color]--;
    }

    map[y][x] = color;
    drawCell(x, y);

    if (checkGameOver(x, y, color)) {
        gameOver = true;
        loseSound.play()
        openLoseModal();
        restartGame();
    } else if (checkGameWon()) {
        gameOver = true;
        openWinModal();
        winSound.play();
    }

    updateColorButtonLabels();
}

function restartGame() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            map[y][x] = 0;
        }
    }
    colorLimits[1] = colorLimits[2] = colorLimits[3] = colorLimits[4] = 25;
    gameOver = false;
    drawMap();
    updateColorButtonLabels();
}

function updateColorButtonLabels() {
    for (let i = 1; i < colors.length; i++) {
        const button = colorPicker.querySelector(`button:nth-child(${i})`);
        button.querySelector('span').textContent = colorLimits[i];
    }
}

function openWinModal() {
    winModal.style.display = 'block';
    winModal.style.transform = 'translate(-50%, -50%) scale(1)';
    createStars();
}

function closeWinModal() {
    winModal.style.transform = 'translate(-50%, -50%) scale(0)';
    winModal.style.display = 'none';
    clearStars();
}

function createStars() {
    const numStars = 30;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starContainer.appendChild(star);
    }
}

function clearStars() {
    starContainer.innerHTML = '';
}

drawMap();

// Create color choosing buttons
const colorButtons = [];
const popSound = document.getElementById('popSound');
for (let i = 1; i < colors.length; i++) {
    const button = document.createElement('button');
    button.style.backgroundColor = colors[i];
    const span = document.createElement('span');
    span.textContent = colorLimits[i];
    button.appendChild(span);

    button.addEventListener('click', function () {
        if (colorLimits[i] > 0) {
            currentColor = i;
            popSound.play();
            // Remove 'selected' class from all buttons
            colorButtons.forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the clicked button
            button.classList.add('selected');
        }
    });

    colorButtons.push(button);

    colorPicker.appendChild(button);
}
const isTouchDevice = 'ontouchstart' in document.documentElement;

// Choose the appropriate event
const clickEvent = isTouchDevice ? 'touchstart' : 'mousedown';

canvas.addEventListener(clickEvent, function (event) {
    const canvasRect = canvas.getBoundingClientRect();

    // Use the first touch in the touches array for touch devices
    const touch = isTouchDevice ? event.touches[0] : event;

    // Calculate the relative coordinates within the canvas
    const x = Math.floor((touch.clientX - canvasRect.left) / (canvasRect.width / mapWidth));
    const y = Math.floor((touch.clientY - canvasRect.top) / (canvasRect.height / mapHeight));

    fillCell(x, y, currentColor);

    // Prevent default behavior to avoid scrolling or other unwanted actions
    event.preventDefault();
});

restartButton.addEventListener('click', function () {
    restartGame();
    popSound.play();
});

winModalRestartButton.addEventListener('click', function () {
    closeWinModal();
    restartGame();
    popSound.play();
});

let currentLanguage = 'eng';
let languageText = {};

function changeLanguage(selectedLanguage) {
    currentLanguage = selectedLanguage;
    setLanguageText(currentLanguage);
    applyColors(); // Update modal button text and colors when language changes
}


function updateButtonText() {
    restartButton.textContent = languageText[currentLanguage].restartButtonText;
    winModalRestartButton.textContent = languageText[currentLanguage].restartButtonText;
    loseModalRestartButton.textContent = languageText[currentLanguage].restartButtonText;
    color1.textContent = languageText[currentLanguage].colors;
    popSound.play();
}

function updateModalText() {
    document.getElementById('win-modal').getElementsByTagName('h2')[0].textContent = languageText[currentLanguage].winModalTitle;
    document.getElementById('lose-modal-title').textContent = languageText[currentLanguage].loseModalTitle;
    document.getElementById('color1').textContent = languageText[currentLanguage].color;
    // Add more lines if you have other text elements in the lose modal
}

async function loadLanguageFile(language) {
    try {
        const response = await fetch(`${language}.json`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(`Error loading language file for ${language}:`, error);
        return {};
    }
}

async function setLanguageText(language) {
    languageText[language] = await loadLanguageFile(language);
    updateButtonText();
    updateModalText();
    updateTitleAndAuthor();
}

setLanguageText(currentLanguage);

function updateCanvasSize() {
    const parent = canvas.parentElement;
    const size = Math.min(parent.offsetWidth, parent.offsetHeight) * 0.8;
    canvas.width = size;
    canvas.height = size;
    drawMap();
}

window.addEventListener('resize', updateCanvasSize);
const loseModal = document.getElementById('lose-modal');
const loseModalRestartButton = document.getElementById('lose-modal-restart');

function openLoseModal() {
    loseModal.style.display = 'block';
    loseModal.style.transform = 'translate(-50%, -50%) scale(1)';
}

function closeLoseModal() {
    loseModal.style.transform = 'translate(-50%, -50%) scale(0)';
    loseModal.style.display = 'none';
}

loseModalRestartButton.addEventListener('click', function () {
    closeLoseModal();
    restartGame();
});

function openLoseModal() {
    loseModal.style.display = 'block';
    loseModal.style.transform = 'translate(-50%, -50%) scale(1)';
}

function closeLoseModal() {
    loseModal.style.transform = 'translate(-50%, -50%) scale(0)';
    loseModal.style.display = 'none';
}

loseModalRestartButton.addEventListener('click', function () {
    closeLoseModal();
    restartGame();
});

openColorModalButton.addEventListener('click', () => {
    colorInputs.forEach((input, index) => {
        input.value = colors[index];
    });
    colorModal.showModal();
});

function applyColors() {
    // Update the second color in the colors array based on the value of the first color
    colors[1] = colorInputs[0].value;

    // Apply the updated colors to the color buttons and redraw the map
    colorButtons.forEach((button, index) => {
        button.style.backgroundColor = colors[index + 1];
    });
    drawMap();
}

saveColorsButton.addEventListener('click', (event) => {
    event.preventDefault();
    colorInputs.forEach((input, index) => {
        if (index !== 0) { // Allow changing only for indices 1, 2, 3, and 4
            colors[index] = input.value;
        }
    });
    colorModal.close();
    applyColors(); // Apply the updated colors when the modal is closed
});
