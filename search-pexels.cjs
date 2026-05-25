const https = require('https');

https.get('https://www.pexels.com/search/range%20rover/', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/images\.pexels\.com\/photos\/(\d+)\/pexels-photo-\1\.jpeg/g);
    if(matches) console.log("Range Rover Pexels:", [...new Set(matches)].slice(0, 5));
  });
});

https.get('https://www.pexels.com/search/lexus%20suv/', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/images\.pexels\.com\/photos\/(\d+)\/pexels-photo-\1\.jpeg/g);
    if(matches) console.log("Lexus Pexels:", [...new Set(matches)].slice(0, 5));
  });
});

https.get('https://www.pexels.com/search/prado%20suv/', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/images\.pexels\.com\/photos\/(\d+)\/pexels-photo-\1\.jpeg/g);
    if(matches) console.log("Prado Pexels:", [...new Set(matches)].slice(0, 5));
  });
});
