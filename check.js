async function run() {
  const ids = [
    '1541443664-07d0669b9ce7',
    '1563720360151-51b087a31826',
    '1559416523-140ddc3d238c',
    '1618362635955-40ea400f9850',
    '1580274459415-d4e5d6d8ee10',
    '1610480922883-2070efaa4d7f', // Luxury SUVs
    '1609520778163-12503d42bcbd',
    '1622181467475-4d7a86f9f592',
    '1632296618581-22920f3cc4a4',
    '1549445995-1f95d1387d7b',
    '1508974415842-8329b35fd0ce'
  ];
  for (const id of ids) {
    const res = await fetch(`https://images.unsplash.com/photo-${id}?w=100`);
    if (res.ok) console.log(id, 'OK');
  }
}
run();
