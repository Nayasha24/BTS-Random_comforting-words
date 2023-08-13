// Fetch a random quote from the API and display it on the new tab page
function fetchRandomQuote() {
  fetch('http://localhost:3000/random-quote')
    .then(response => response.json())
    .then(data => {
      const quoteElement = document.getElementById('quote');
      const memberElement = document.getElementById('member');
      const whenElement = document.getElementById('when');

      quoteElement.textContent = data.quote;
      memberElement.textContent = `— ${data.member}`;
      whenElement.textContent = data.when ? `(${data.when})` : '';
    })
    .catch(error => {
      console.error('Error fetching random quote:', error.message);
    });
}

// Execute fetchRandomQuote() when the content script is injected (on the new tab page)
fetchRandomQuote();
