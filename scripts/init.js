let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

const formTranslate = document.getElementById('form-translate');
const resultPre = document.getElementById('result');
const btnTxtToSpeech = document.getElementById('btn-txt-speech');
const btnCopy = document.getElementById('btn-copy');