// Show New Quotes
function newQuote(quoteList) {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = quoteList[Math.floor(Math.random() * apiQuotes.length)];

    // Check Quote length to determine styling
    if (quote.text.length > 120){
        quoteText.classList.add("longQuote");
    }
    else {
        quoteText.classList.remove("longQuote");
    }
    // Set Quote, Hide Loader
    quoteAuthor.textContent = quote.author;
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

// Get Quotes From API
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote(apiQuotes);
    }catch(error){
        //Catch Error Here
        newQuote(localQuotes)
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, "_blank")
}


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Variables and Constants
let apiQuotes = [];
const quoteContainer = document.getElementById("quoteContainer");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("newQuote");
const loader = document.getElementById("loader");

// Event Listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
