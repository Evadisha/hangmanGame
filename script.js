const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letter");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playAgainBtn= document.getElementById("play-button");
const notification = document.getElementById("notification-container");
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'wizard', 'message', 'fundamentals', 'computer', 'notification', 'audio', 'video'];
//To get selected word
let selectedWord = words[Math.floor(Math.random() * words.length)];
//Letters array 
const correctLetters = [];
const wrongLetters = [];

// Displaying words in game container
function displayWords() {
    wordEl.innerHTML = `${selectedWord
        .split('')
        .map(
            letter => `
            <span class="letter">
                ${(correctLetters.includes(letter)) ? letter : ''}
            </span>
            `
        )
        .join('')}
        `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');
    console.log(innerWord, selectedWord)
    if (innerWord == selectedWord) {
        finalMessage.innerHTML = 'Congratulations! You Won!';
        popup.style.display = 'flex';
    }
}

// Wrong letter container
function updateWrongLetters() {
    wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none';
        }

        if (errors==figureParts.length) {
            finalMessage.innerHTML = 'Unfortunately, You lost!';
            popup.style.display = 'flex';
        }
    });


}

// Showing the notification for repeated letters
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => { notification.classList.remove('show') }, 1000);
}

// Event listener for key press
window.addEventListener('keydown', e => {
    if (e.key >= 'a' && e.key <= 'z') {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWords();
            }
            else {
                showNotification();
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else {
                showNotification();
            }
        }
    }
});

// Event listener to mouse click
playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    popup.style.display = "none";
    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWords();

    updateWrongLetters();

    
});

//For the first interaction with player 
displayWords();