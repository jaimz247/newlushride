async function run() {
  const query = "black luxury suv";
  const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`, {
    headers: { Authorization: "563492ad6f91700001000001dfa151b72e504c519aaab3b80b2e3e60" } // Publicly known free pexels key
  });
  const json = await res.json();
  if (json.photos) {
    console.log(json.photos.map(p => p.src.large2x).join('\n'));
  }
}
run();
