// Dom Variales
const greetingText = document.getElementById('greeting_text');
const userName = document.getElementById('name');
const userFocus = document.getElementById('focus');
const quotes = document.getElementById('quotes');
const author = document.getElementById('auhtor');

// Constants Strings
const USER_NAME = 'USER_NAME';
const USER_FOCUS = 'USER_FOCUS';
const LAST_DATE = 'LAST_DATE';
const LAST_QUOTE_INDEX = 'LAST_QUOTE_INDEX';

function main() {
    setGreetingAndBg();
    getFocus();
    getName();
    setListeners();
    setQuote();
}


function setGreetingAndBg() {
    let today = new Date();
    let hours = today.getHours();
    if (hours < 12) {
        document.body.style.backgroundImage = "url('./images/morning.jpg')";
        greetingText.textContent = "Good Morning";
    } else if (hours < 16) {
        document.body.style.backgroundImage = "url('./images/afternoon.jpg')";
        greetingText.textContent = "Good Afternoon";
    } else if (hours < 20) {
        document.body.style.backgroundImage = "url('./images/evening.jpg')";
        greetingText.textContent = "Good Evening";
    } else if (hours < 16) {
        document.body.style.backgroundImage = "url('./images/night.jpg')";
        greetingText.textContent = "Good Evening";
    }
}

function getName() {
    if (localStorage.getItem(USER_NAME) === null) {
        userName.textContent = '[your name]';
    } else {
        userName.textContent = localStorage.getItem(USER_NAME);
    }
}

function getFocus() {
    if (localStorage.getItem(USER_FOCUS) === null) {
        userFocus.textContent = '[set your focus here]';
    } else {
        userFocus.textContent = localStorage.getItem(USER_FOCUS);
    }
}

function setListeners() {
    userName.addEventListener('blur', setUserName);
    userName.addEventListener('keypress', setUserName);

    userFocus.addEventListener('blur', setUserFocus);
    userFocus.addEventListener('keypress', setUserFocus);
}

function setUserName(event) {
    if (event.type === 'keypress') {
        if (event.which == 13 && event.keyCode == 13) {
            localStorage.setItem(USER_NAME, event.target.innerText)
            userName.blur();
        }
    } else {
        localStorage.setItem(USER_NAME, event.target.innerText)
    }
}

function setUserFocus() {
    if (event.type === 'keypress') {
        if (event.which == 13 && event.keyCode == 13) {
            localStorage.setItem(USER_FOCUS, event.target.innerText)
            userFocus.blur();
        }
    } else {
        localStorage.setItem(USER_FOCUS, event.target.innerText)
    }
}

function isSameDate() {
    let isSame = false;
    let today = new Date();
    let date = today.getDate();

    if (localStorage.getItem(LAST_DATE) === null) {
        localStorage.setItem(LAST_DATE, date);
        isSame = false;
    } else {
        if (localStorage.getItem(LAST_DATE) == date) {
            isSame = true;
        } else {
            isSame = false;
        }
    }
    return isSame;
}

function getRandomNumber() {
    var random = 0;
    if (isSameDate()) {
        random = localStorage.getItem(LAST_QUOTE_INDEX);
    } else {
        var random = Math.floor(Math.random() * (28 - 0 + 1)) + 0;
        localStorage.setItem(LAST_QUOTE_INDEX, random);
    }
    return random;
}

function getQuote() {
    var quoteData = [];
    var index = getRandomNumber();
    quoteData[0] = quotesList[index].author;
    quoteData[1] = quotesList[index].quote;
    return quoteData;
}

function setQuote() {
    let randomQuote = getQuote();
    quotes.textContent = randomQuote[1];
    author.textContent = "- " + randomQuote[0];

    setTimeout(setQuote, 1000 * 60 * 60);
}

main();