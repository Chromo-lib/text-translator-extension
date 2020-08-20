let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

window.addEventListener('click', () => {
  try {
    chrome.runtime.sendMessage({ selectedText: window.getSelection().toString() });
  } catch (error) {
    
  }
}, false);