async function translateAndSetResult (from = 'auto', toLang = 'fr', text = 'hello') {
  //let moreResultPre = document.getElementById('more-result');

  try {
    if (text) text = text.toLowerCase();

    const params = `&sl=${from}&tl=${toLang}&hl=${toLang}&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=sos&dt=ss&dt=t&dt=gt&otf=1&ssel=0&tsel=0`;
    const gUrl = "https://translate.googleapis.com/translate_a/single?client=gtx" + params + "&q=" + encodeURIComponent(text);

    const resp = await fetch(gUrl);
    const jsonRes = await resp.json();

    // let res = jsonRes[5][0][2].map(v=> v[0]).join('<br>');
    // moreResultPre.innerHTML = `<strong>More translations: ${text}</strong> <br>${res}`;
    resultPre.value = jsonRes[0][0][0];    
  } catch (error) {
    resultPre.textContent = text;
  }
}
