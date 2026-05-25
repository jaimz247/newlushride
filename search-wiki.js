async function search(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=${encodeURIComponent(query)}&piprop=original`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    const pages = json.query?.pages;
    if (pages) {
      for (let id in pages) {
        if (pages[id].original) {
          console.log(query, pages[id].original.source);
        }
      }
    }
  } catch(e) {}
}
async function run() {
  await search("black lexus suv");
  await search("black range rover suv");
  await search("black toyota prado suv");
}
run();
