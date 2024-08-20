let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startTimer() {
    startTime = new Date().getTime();
    tInterval = setInterval(updateTimer, 1000);
    startStopBtn.innerHTML = "Pause";
    running = true;
    lapBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(tInterval);
    startStopBtn.innerHTML = "Start";
    running = false;
    lapBtn.disabled = true;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    laps.innerHTML = '';
    lapCounter = 1;
    lapBtn.disabled = true;
}

function lapTimer() {
    const lapTime = display.innerHTML;
    const lapElement = document.createElement('div');
    lapElement.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
    laps.appendChild(lapElement);
    lapCounter++;
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

startStopBtn.addEventListener('click', function() {
    if (!running) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

lapBtn.disabled = true; // Disable the lap button initially
