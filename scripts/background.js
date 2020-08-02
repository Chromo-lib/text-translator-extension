let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

var wdwSelection = 'hello';

function receiver (request, sender, response) {
  wdwSelection = (request.text && request.text.length > 0) ? request.text : 'hello';

  chrome.storage.sync.get(['language'], function (result) {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { language: result.language }, function (response) { });
    });
  });
}

chrome.runtime.onMessage.addListener(receiver);
