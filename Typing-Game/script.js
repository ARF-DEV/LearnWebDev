const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];


let words = [];
let wordIndex = 0;

let startTime = Date.now();

const quotesElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typevalueElement = document.getElementById('typed-value');
typevalueElement.disabled = true;


//Start event
document.getElementById('start').addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    let quote = quotes[quoteIndex];

    words = quote.split(' ');

    wordIndex = 0;

    // Create an array of span elements so we can set a class
    const wordSpans = words.map(word => `<span>${word} </span>`)
    // Convert into string and set as innerHTML on quote display
    quotesElement.innerHTML = wordSpans.join('');
    // Highlight the first word
    quotesElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerHTML = '';

    // Clear the textbox
    typevalueElement.value = '';
    // set focus
    typevalueElement.disabled = false;
    typevalueElement.focus();
    // Start the timer
    startTime = new Date().getTime();

});


typevalueElement.addEventListener('input',() => {
    const typeValue = typevalueElement.value;
    const currentWord = words[wordIndex];
    
    console.log(quotesElement.childNodes[wordIndex]);
    if (typeValue === currentWord && wordIndex === words.length - 1)
    {
        const timePassed = new Date().getTime() - startTime;
        const winMessage = `CONGRATULATIONS! You finished in ${timePassed / 1000} seconds.`;
        const currentBestTime = localStorage.getItem('bestTime');
        if (!currentBestTime)
        {
            localStorage.setItem('bestTime', timePassed);
        }
        else 
        {
            localStorage.setItem('bestTime', Math.min(timePassed, currentBestTime));
        }
        messageElement.innerText = winMessage;
        typevalueElement.value = '';
        typevalueElement.disabled = true;
    }
    else if (typeValue.endsWith(' ') && typeValue.trim() === currentWord)
    {
        typevalueElement.value = '';
        quotesElement.childNodes[wordIndex].className = '';
        wordIndex++;
        quotesElement.childNodes[wordIndex].className = 'highlight';

    }
    else if (currentWord.startsWith(typeValue))
    {
        typevalueElement.className = '';
    }
    else 
    {
        typevalueElement.className = 'error';
    }


});