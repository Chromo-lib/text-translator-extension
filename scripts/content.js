let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

window.addEventListener('click', () => {
  chrome.runtime.sendMessage({ selectedText: window.getSelection().toString() });
  void chrome.runtime.lastError;
}, false);