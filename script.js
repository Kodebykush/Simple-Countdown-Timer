// Global variables for timer state
let countdown;
let timeLeft;
let isRunning = false;

// DOM element references
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const timeDisplay = document.getElementById('time-display');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timerSound = document.getElementById('timer-sound');

// Event listeners for buttons
startButton.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetButton.addEventListener('click', resetTimer);

/**
 * Starts the countdown timer
 * Converts input minutes and seconds to total seconds and begins countdown
 */
function startTimer() {
    if (!isRunning) {
        // Convert input values to numbers, default to 0 if invalid
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        timeLeft = minutes * 60 + seconds;

        // Don't start if time is 0 or negative
        if (timeLeft <= 0) return;

        isRunning = true;
        startButton.textContent = 'Pause';
        
        // Start countdown interval
        countdown = setInterval(() => {
            timeLeft--;
            updateDisplay();

            // Check if timer has finished
            if (timeLeft <= 0) {
                clearInterval(countdown);
                isRunning = false;
                timeDisplay.textContent = "Time's up!";
                startButton.textContent = 'Start';
                timerSound.play();
            }
        }, 1000);
    }
}

/**
 * Pauses the currently running timer
 */
function pauseTimer() {
    clearInterval(countdown);
    isRunning = false;
    startButton.textContent = 'Start';
}

/**
 * Resets the timer to initial state
 */
function resetTimer() {
    clearInterval(countdown);
    isRunning = false;
    timeLeft = 0;
    minutesInput.value = '';
    secondsInput.value = '';
    timeDisplay.textContent = '00:00';
    startButton.textContent = 'Start';
}

/**
 * Updates the timer display
 * Converts remaining seconds to minutes:seconds format
 */
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
} 