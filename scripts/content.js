let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

window.addEventListener('click', () => {
  if (chrome.runtime.lastError) {
    return;
  }
  else {
    chrome.runtime.sendMessage({ selectedText: window.getSelection().toString() });
  }
}, false);