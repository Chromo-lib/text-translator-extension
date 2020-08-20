(function () {
  chrome.storage.local.get(['selectedText'], (result) => {
    const txtArea = document.getElementById('txt-area');
    if (result && result.selectedText && txtArea) {
      txtArea.value = result.selectedText;
    }
  });

  function onSubmit (e) {
    e.preventDefault();

    let btnSubmit = e.target.elements[e.target.elements.length - 1];
    btnSubmit.disabled = true;
    btnSubmit.classList.add('disabled');

    let fromlang = e.target.elements[0].value;
    let tolang = e.target.elements[2].value;
    let selectedText = e.target.elements[3].value.replace(/\(\)\]\[\:\;\=\,/gim, " ").trim();

    translateAndSetResult(fromlang, tolang, selectedText)
      .then(r => {
        chrome.storage.local.set({ selectedText }, () => {
          btnSubmit.disabled = false;
          btnSubmit.classList.remove('disabled');
        });
      })
      .catch(e => { });
  }

  formTranslate.addEventListener('submit', onSubmit, false);  
})();
