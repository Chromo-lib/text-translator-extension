async function translateAndSetResult (from = 'en', toLang = 'fr', text = 'hello') {

  let resultPre = document.getElementById('result');

  try {
    if (text) text = text.toLowerCase();

    let gUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
      + 'auto' + "&tl=" + toLang + "&dt=t&q=" + encodeURIComponent(text);

    const resp = await fetch(gUrl);
    const jsonRes = await resp.json();
    resultPre.textContent = jsonRes[0][0][0];
  } catch (error) {
    resultPre.textContent = text;
  }
}
