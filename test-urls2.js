async function check() {
  const ids = [
    '1549924231-f129b911e442', '1573497019940-1c28c88b4f3e', '1560250097-0b93528c311a', '1506794778202-cad84cf45f1d', '1519085360753-af0119f7cbe7', '1556157382-97eda2d62296', // Black man
    '1590362891991-f766e5108bfe', '1533473359331-0135ef1b58bf', // Lexus/SUVs
    '1617531653332-bd46c24f2068', '1605559424843-9e4c228bf1c2', '1568605117036-5fe5e7bab0b7'
  ];
  for (const id of ids) {
    const url = 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=800&q=80';
    try {
      const res = await fetch(url);
      console.log(id, res.status);
    } catch(e) {}
  }
}
check();
