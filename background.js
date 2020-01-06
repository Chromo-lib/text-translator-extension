var selectedWord = 'hello';
chrome.runtime.onMessage.addListener(receiver);

function receiver (request, sender, response) {
  selectedWord = request.text;
}