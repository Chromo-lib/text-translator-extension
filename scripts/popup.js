window.addEventListener('load', () => {

  const { wdwSelection } = chrome.extension.getBackgroundPage();
  const selectLangs = document.getElementById('languages');

  (async () => {
    try {
      const gResult = await translateTo(wdwSelection, 'ar');
      //const result = await translate(wdwSelection);     
      createLiElements(wdwSelection, 'Arabic', gResult);
    }
    catch (e) {
      //console.log(e)
    }
  })();

  selectLangs.addEventListener('change', getSelectedLang);
  function getSelectedLang (e) {
    const selectedLangText = selectLangs.options[selectLangs.selectedIndex].text;

    translateTo(wdwSelection, e.target.value)
      .then(gResult => {
        createLiElements(wdwSelection, selectedLangText, gResult);
      })
      .catch(e => {

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