window.addEventListener('mouseup', (e) => {

  var wgs = window.getSelection();
  var wdwSelection = wgs ? wgs.toString().trim() : '';

  if (wdwSelection && wdwSelection.length > 1) {
    wdwSelection = wdwSelection.replace(/[&\/\\#,+()$~%.'":*?<>{}\]\[\=]/g, ' ');
    chrome.runtime.sendMessage({ text: wdwSelection });
  }
});