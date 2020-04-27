window.addEventListener('mouseup', (e) => {

  var wgs = window.getSelection();
  var wdwSelection = wgs ? wgs.toString().trim() : '';

  if (wdwSelection && wdwSelection.length > 1) {
    wdwSelection = wdwSelection.replace(/[&\/\\#,+()$~%.'":*?<>{}\]\[\=]/g, ' ');
    chrome.runtime.sendMessage({ text: wdwSelection });

    (async () => {
      let gResult = '';
      try {
        const language = navigator.language.slice(0, 2) || 'ar';
        gResult = await translateTo(wdwSelection, language);
      }
      catch (e) {
        gResult = await translate(wdwSelection);
      }

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
});