async function run() {
  let res = await fetch('https://unsplash.com/napi/search/photos?query=luxury%20suv&per_page=5');
  let json = await res.json();
  console.log("Luxury SUV:", json.results.map(r => r.urls.raw.split('?')[0]));

  res = await fetch('https://unsplash.com/napi/search/photos?query=range%20rover&per_page=5');
  json = await res.json();
  console.log("Range Rover:", json.results.map(r => r.urls.raw.split('?')[0]));

  res = await fetch('https://unsplash.com/napi/search/photos?query=lexus%20suv&per_page=5');
  json = await res.json();
  console.log("Lexus:", json.results.map(r => r.urls.raw.split('?')[0]));

  res = await fetch('https://unsplash.com/napi/search/photos?query=land%20cruiser&per_page=5');
  json = await res.json();
  console.log("Toyota:", json.results.map(r => r.urls.raw.split('?')[0]));

  res = await fetch('https://unsplash.com/napi/search/photos?query=black%20businessman&per_page=5');
  json = await res.json();
  console.log("Black Businessman:", json.results.map(r => r.urls.raw.split('?')[0]));
}
run();
