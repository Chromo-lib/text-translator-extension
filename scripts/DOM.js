const glanguages = {
  'af': 'Afrikaans',
  'sq': 'Albanian',
  'am': 'Amharic',
  'ar': 'Arabic',
  'hy': 'Armenian',
  'az': 'Azerbaijani',
  'eu': 'Basque',
  'be': 'Belarusian',
  'bn': 'Bengali',
  'bs': 'Bosnian',
  'bg': 'Bulgarian',
  'ca': 'Catalan',
  'ceb': 'Cebuano',
  'ny': 'Chichewa',
  'zh-cn': 'Chinese Simplified',
  'zh-tw': 'Chinese Traditional',
  'co': 'Corsican',
  'hr': 'Croatian',
  'cs': 'Czech',
  'da': 'Danish',
  'nl': 'Dutch',
  'eo': 'Esperanto',
  'en': 'English',
  'et': 'Estonian',
  'tl': 'Filipino',
  'fi': 'Finnish',
  'fr': 'French',
  'fy': 'Frisian',
  'gl': 'Galician',
  'ka': 'Georgian',
  'de': 'German',
  'el': 'Greek',
  'gu': 'Gujarati',
  'ht': 'Haitian Creole',
  'ha': 'Hausa',
  'haw': 'Hawaiian',
  'iw': 'Hebrew',
  'hi': 'Hindi',
  'hmn': 'Hmong',
  'hu': 'Hungarian',
  'is': 'Icelandic',
  'ig': 'Igbo',
  'id': 'Indonesian',
  'ga': 'Irish',
  'it': 'Italian',
  'ja': 'Japanese',
  'jw': 'Javanese',
  'kn': 'Kannada',
  'kk': 'Kazakh',
  'km': 'Khmer',
  'ko': 'Korean',
  'ku': 'Kurdish (Kurmanji)',
  'ky': 'Kyrgyz',
  'lo': 'Lao',
  'la': 'Latin',
  'lv': 'Latvian',
  'lt': 'Lithuanian',
  'lb': 'Luxembourgish',
  'mk': 'Macedonian',
  'mg': 'Malagasy',
  'ms': 'Malay',
  'ml': 'Malayalam',
  'mt': 'Maltese',
  'mi': 'Maori',
  'mr': 'Marathi',
  'mn': 'Mongolian',
  'my': 'Myanmar (Burmese)',
  'ne': 'Nepali',
  'no': 'Norwegian',
  'ps': 'Pashto',
  'fa': 'Persian',
  'pl': 'Polish',
  'pt': 'Portuguese',
  'ma': 'Punjabi',
  'ro': 'Romanian',
  'ru': 'Russian',
  'sm': 'Samoan',
  'gd': 'Scots Gaelic',
  'sr': 'Serbian',
  'st': 'Sesotho',
  'sn': 'Shona',
  'sd': 'Sindhi',
  'si': 'Sinhala',
  'sk': 'Slovak',
  'sl': 'Slovenian',
  'so': 'Somali',
  'es': 'Spanish',
  'su': 'Sundanese',
  'sw': 'Swahili',
  'sv': 'Swedish',
  'tg': 'Tajik',
  'ta': 'Tamil',
  'te': 'Telugu',
  'th': 'Thai',
  'tr': 'Turkish',
  'uk': 'Ukrainian',
  'ur': 'Urdu',
  'uz': 'Uzbek',
  'vi': 'Vietnamese',
  'cy': 'Welsh',
  'xh': 'Xhosa',
  'yi': 'Yiddish',
  'yo': 'Yoruba',
  'zu': 'Zulu'
};

(function () {
  let selectedLanguages = { fromlang: 'en', tolang: 'ar' };

  function getSelectedLanguages (result) {
    if (result.selectedLanguages) {
      selectedLanguages = result.selectedLanguages;
    }

    setupSelectElements(selectedLanguages);

    document.getElementById('btn-switch-langs').addEventListener("click", () => {
      selectedLanguages = { fromlang: selectedLanguages.tolang, tolang: selectedLanguages.fromlang };
      setupSelectElements(selectedLanguages);
      chrome.storage.local.set({ selectedLanguages });
    }, false);
  }

  function setupSelectElements (selectedLanguages) {
    const allSelectElemes = Array.from(document.querySelectorAll("select"));

    allSelectElemes.forEach(selectEl => {

      optionsLanguages(selectEl);

      selectEl.addEventListener('change', (e) => {
        selectedLanguages = { ...selectedLanguages, [e.target.name]: e.target.value };
        chrome.storage.local.set({ selectedLanguages });
      }, false);
    });
  };

  // create options language and appended to select element
  function optionsLanguages (selectEl) {
    Object.keys(glanguages).forEach(lang => {
      const option = document.createElement('option');
      option.value = lang;
      option.textContent = glanguages[lang];
      selectEl.appendChild(option);
    });

    if (selectEl.name === 'fromlang') selectEl.value = selectedLanguages.fromlang;
    if (selectEl.name === 'tolang') selectEl.value = selectedLanguages.tolang;
  }

  function txtToSpeach () {
    if ('speechSynthesis' in window && resultPre.value.length > 0) {
      let msg = new SpeechSynthesisUtterance();
      msg.lang = selectedLanguages.tolang;
      msg.text = resultPre.value;
      window.speechSynthesis.speak(msg);
    }
  }

  function copyToClp () {
    resultPre.select();
    document.execCommand('copy');
  }

  btnCopy.addEventListener('click', copyToClp, false);
  btnTxtToSpeech.addEventListener('click', txtToSpeach, false);
  chrome.storage.local.get(['selectedLanguages'], getSelectedLanguages);
})();
