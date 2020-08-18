let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

function receiver (request) {
  if (request && request.selectedText && !chrome.runtime.lastError) {
    chrome.storage.local.set({ selectedText:request.selectedText });
  }
}

chrome.runtime.onMessage.addListener(receiver);
