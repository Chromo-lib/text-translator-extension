window.addEventListener('load', () => {

  const bgword = chrome.extension.getBackgroundPage();
  const targetWord = bgword.selectedWord;
  const selectLangs = document.getElementById('languages');

  (async () => {
    try {
      const gResult = await translateTo(targetWord, 'fr');
      const result = await translate(targetWord);

      createLiElements (targetWord, 'French', gResult)
    }
    catch (e) {
      //console.log(e)
    }
  })();

  selectLangs.addEventListener('change', getSelectedLang);
  function getSelectedLang (e) {
    const selectedLangText = selectLangs.options[selectLangs.selectedIndex].text;

    translateTo(targetWord, e.target.value)
      .then(gResult => {
        createLiElements (targetWord, selectedLangText, gResult);
      })
      .catch(e => {

      });
  }

  function createLiElements (targetWord, selectedLangText, gResult) {
    document.getElementById('result').innerHTML = `
      <li>
        <span class="mb10">English:</span> 
        <span>${targetWord}</span>
      </li>
      <li class="bg-rcolor">
        <span class="mb10">${selectedLangText}:</span>
        <span>${gResult}</span>
      </li>
    `;
  }

});