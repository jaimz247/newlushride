async function check() {
  try {
     const res = await fetch('https://source.unsplash.com/800x600/?range-rover', { redirect: 'manual' });
     console.log('Status:', res.status);
     console.log('Location:', res.headers.get('location'));
  } catch(e) {
     console.log(e);
  }
}
check();
