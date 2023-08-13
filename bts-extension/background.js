// Add an event listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // No need to execute fetchRandomQuote() here
  // The content script will be injected automatically on the new tab page
});

// Listen for tab updates (e.g., when a new tab is opened or refreshed)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Execute fetchRandomQuote() when the tab is updated (including new tabs)
  
    // Execute fetchRandomQuote() when the tab is updated (including new tabs)
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['script.js'],
    });
});
console.log("service worker is working. ")
