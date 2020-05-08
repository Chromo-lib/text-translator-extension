window.addEventListener('load', () => {

  const { wdwSelection } = chrome.extension.getBackgroundPage();
  const selectLangs = document.getElementById('languages');

  chrome.storage.sync.get(['language'], function (result) {
    const nativeLanguage = result.language || navigator.language.slice(0, 2);
    let translatedText = '';

    (async () => {
      try {
        translatedText = await translateTo(wdwSelection, nativeLanguage);
        createLiElements(wdwSelection, langs[nativeLanguage], translatedText);
      }
      catch (e) {}
    })();

  });

  selectLangs.addEventListener('change', getSelectedLang);
  function getSelectedLang (e) {
    const selectedLangText = selectLangs.options[selectLangs.selectedIndex].text;

    chrome.storage.sync.set({ language: e.target.value }, function () {
      (async () => {
        try {
          translatedText = await translateTo(wdwSelection, e.target.value)
          createLiElements(wdwSelection, selectedLangText, translatedText);
        } catch (error) {}
      })();
    });
  }

  function createLiElements (wdwSelection, selectedLangText, gResult) {

    txtAlign = selectedLangText === 'Arabic' ? 'text-align:right !important' : 'text-align:left';

    document.getElementById('result').innerHTML = `
      <li>
        <span class="mb10">English:</span> 
        <span>${wdwSelection}</span>
      </li>
      <li class="border-top">
        <span class="mb10">${selectedLangText}:</span>
        <span style="${txtAlign}">${gResult}</span>
      </li>
    `;
  }
});