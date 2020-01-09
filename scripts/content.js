window.addEventListener('mouseup', (e) => {

  var wdwSelection = window.getSelection().toString().trim();
  
  if (wdwSelection && wdwSelection.length > 1) {
    wdwSelection = wdwSelection.replace(/[&\/\\#,+()$~%.'":*?<>{}\]\[\=]/g, ' ');;
    chrome.runtime.sendMessage({ text: wdwSelection });
  }
});