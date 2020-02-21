var wdwSelection = 'hello';
chrome.runtime.onMessage.addListener(receiver);

function receiver (request, sender, response) {
  wdwSelection = (request.text && request.text.length > 0) ? request.text : 'hello';  
}