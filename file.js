const axios = require('axios');
const Tesseract = require('tesseract.js');
const Jimp = require('jimp');

const imageUrl = 'https://example.com/captcha.jpg'; // Replace with your image URL

axios.get(imageUrl, { responseType: 'arraybuffer' })
  .then(response => {
    const buffer = Buffer.from(response.data, 'binary');
    return Jimp.read(buffer);
  })
  .then(image => {
    image.invert().contrast(1).write('captcha.jpg');
    return Tesseract.recognize('captcha.jpg', 'eng');
  })
  .then(result => {
    const captcha = result.text.trim();
    console.log(captcha);
  })
  .catch(error => {
    console.error(error);
  });
