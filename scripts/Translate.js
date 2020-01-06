async function translate (word) {

  try {
    const reqOptions = {
      src: 'en',
      dest: 'fr',
      text: word || 'this is a sample text in english',
      email: 'haikel.fazzani@gmail.com',
      password: 'wxc 0123'
    };

    const rawResponse = await fetch('https://frengly.com/frengly/data/translate', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(reqOptions)
    });

    const content = await rawResponse.json();
    const data = await content.list[0].destWord;
    return data;
  }
  catch (e) {
    return e;
  }
};
