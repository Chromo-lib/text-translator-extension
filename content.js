window.addEventListener('mouseup', (e) => {

  var selectedWord = window.getSelection().toString().trim();

  if (selectedWord && selectedWord.length > 1) {
    selectedWord = selectedWord.replace(/[&\/\\#,+()$~%.'":*?<>{}\]\[\=]/g, ' ');;
    chrome.runtime.sendMessage({ text: selectedWord });
  }
});