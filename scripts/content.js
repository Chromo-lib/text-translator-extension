let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

var langRecivedFromBackground = '';

function receiver (request, sender, response) {
  localStorage.setItem('language', request.language);
  langRecivedFromBackground = request.language;  
}

function showPop (e) {

  var wgs = window.getSelection();
  var wdwSelection = wgs ? wgs.toString().trim() : '';

  if (wdwSelection && wdwSelection.length > 1) {
    wdwSelection = wdwSelection.replace(/[&\/\\#,+()$~%.'":*?<>{}\]\[\=]/g, ' ');

    setTimeout(() => {
      chrome.runtime.sendMessage({ text: wdwSelection });
    }, 1000);


    (async () => {
      let gResult = '';

      try {
        let local = localStorage.getItem('language');
        const language = local || navigator.language.slice(0, 2) || 'ar';
        gResult = await translateTo(wdwSelection, language);
      }
      catch (e) { }

      const elements = document.getElementsByClassName("popup");
      while (elements.length > 0) elements[0].remove();

      setTimeout(() => {
        const div = document.createElement('div');
        div.classList.add('popup');
        div.innerHTML = gResult;

        div.style.left = (e.pageX - 20) + 'px';
        div.style.top = (e.pageY + 20) + 'px';
        div.style.display = 'block';

        document.body.appendChild(div);
      }, 500);
    })();
  }
  else {
    const elements = document.getElementsByClassName("popup");
    while (elements.length > 0) elements[0].remove();
  }
}

window.addEventListener('click', showPop);
chrome.runtime.onMessage.addListener(receiver);