const inputArea = document.getElementById('input-area') as HTMLTextAreaElement;
const timeDisplay = document.getElementById('time') as HTMLElement;
const wpmDisplay = document.getElementById('wpm') as HTMLElement;
const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
const resultMessage = document.getElementById('result-message') as HTMLElement;

let timeLeft = 60;
let timer: number | null = null;
let isTestRunning = false;

function startTest() {
    if (isTestRunning) return;

    isTestRunning = true;
    timeLeft = 60;
    timeDisplay.textContent = timeLeft.toString();
    wpmDisplay.textContent = '0';
    inputArea.value = '';
    inputArea.disabled = false;
    inputArea.focus();
    resultMessage.classList.add('hidden');
    resultMessage.textContent = '';

    timer = window.setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft.toString();

        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

function endTest() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    isTestRunning = false;
    inputArea.disabled = true;

    const wordsTyped = inputArea.value.trim().split(/\s+/).length;
    wpmDisplay.textContent = wordsTyped.toString();

    // Show result message
    if (wordsTyped > 40) {
        resultMessage.textContent = 'Excellent typing speed!';
    } else if (wordsTyped > 20) {
        resultMessage.textContent = 'Good job! Keep practicing.';
    } else {
        resultMessage.textContent = 'Keep practicing to improve your speed.';
    }
    resultMessage.classList.remove('hidden');
}

startBtn.addEventListener('click', startTest);
inputArea.disabled = true;

// Instant calculation of words and time while typing
inputArea.addEventListener('input', () => {
    if (!isTestRunning) return;

    const wordsTyped = inputArea.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    wpmDisplay.textContent = wordsTyped.toString();

    // Calculate elapsed time
    const elapsedTime = 60 - timeLeft;
    if (elapsedTime > 0) {
        const wpm = Math.round((wordsTyped / elapsedTime) * 60);
        wpmDisplay.textContent = wpm.toString();
    }
});
