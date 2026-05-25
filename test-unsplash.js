async function check() {
  const urls = [
    // City
    'https://images.unsplash.com/photo-1534430480872-3498386e7856', 
    'https://images.unsplash.com/photo-1518398046578-8cca57782e17', 
    'https://images.unsplash.com/photo-1522083111832-15f1c97aee48', 
    'https://images.unsplash.com/photo-1444723121867-7a241cacace9', 
    'https://images.unsplash.com/photo-1533036444856-bbdf5b3fe7d0',
    
    // Suvs
    'https://images.unsplash.com/photo-1503376712351-469a4891124d',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf', // car
    'https://images.unsplash.com/photo-1525609004556-c46dce31c4b5',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24', // suv
    'https://images.unsplash.com/photo-1563720225384-9c0bc5254583',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2'
  ];
  
  for (const url of urls) {
    try {
      const res = await fetch(url + '?auto=format&fit=crop&w=800&q=80');
      console.log(url, res.status);
    } catch(e) {
      console.log(url, 'error');
    }
  }
}
check();
