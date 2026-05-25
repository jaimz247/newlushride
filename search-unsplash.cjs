const https = require('https');

const options = {
  hostname: 'unsplash.com',
  path: '/napi/search/photos?query=range%20rover&per_page=5',
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36' }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log("Range Rover:", json.results.map(r => r.urls.raw.split('?')[0]));
    } catch(e) { }
  });
});

const options2 = { ...options, path: '/napi/search/photos?query=lexus%20suv&per_page=5' };
https.get(options2, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log("Lexus:", json.results.map(r => r.urls.raw.split('?')[0]));
    } catch(e) { }
  });
});

const options3 = { ...options, path: '/napi/search/photos?query=land%20cruiser%20prado&per_page=5' };
https.get(options3, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log("Toyota:", json.results.map(r => r.urls.raw.split('?')[0]));
    } catch(e) { }
  });
});
