async function run() {
  const q = ['black range rover suv', 'lexus suv', 'black suv'];
  for (const query of q) {
    const res = await fetch('https://www.pexels.com/search/' + encodeURIComponent(query) + '/?orientation=landscape', {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Safari/537.36' }
    });
    try {
      const html = await res.text();
      const matches = html.match(/https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.jpeg/g);
      console.log(query + ':\n' + [...new Set(matches)].slice(0, 5).join('\n'));
    } catch(e) {
      console.log('failed', query);
    }
  }
}
run();
