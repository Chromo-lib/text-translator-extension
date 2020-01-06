async function translateTo (word, targetLang) {
  var gUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
    + 'auto' + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(word || 'hello');

  const resp = await fetch(gUrl);
  const jsonRes = await resp.json();
  return jsonRes[0][0][0];
}