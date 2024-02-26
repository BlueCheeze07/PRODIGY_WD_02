const timeDisplay = document.querySelector('.time');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapTimes = [];

// Update time display function
function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime + elapsedTime;
    const ms = elapsedTime % 1000;
    const s = Math.floor(elapsedTime / 1000) % 60;
    const m = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const h = Math.floor(elapsedTime / (1000 * 60 * 60));

    timeDisplay.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

// Start button click handler
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        intervalId = setInterval(updateTime, 10); // Update time every 10 milliseconds
        startBtn.disabled = true;
        stopBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

// Stop button click handler
stopBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        lapBtn.disabled = true;
    }
});

// Lap button click handler
lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = elapsedTime;
        lapTimes.push(lapTime);
        const lapListItem = document.createElement('li');
        lapListItem.textContent = `Lap ${lapTimes.length}: ${timeDisplay.textContent}`;
        lapsList.appendChild(lapListItem);
    }
});

// Reset button click handler
resetBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.000';
    lapTimes = [];
    lapsList.innerHTML = ''; // Clear lap list
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
});
