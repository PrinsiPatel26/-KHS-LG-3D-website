const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const html = await fetchUrl('https://khslg.com/');
    fs.writeFileSync('scratch/khslg_home.html', html);
    
    // Find all links
    const linkMatches = [...html.matchAll(/href=["'](https?:\/\/khslg\.com\/[^"']*)["']/g)].map(m => m[1]);
    const uniqueLinks = [...new Set(linkMatches)];
    console.log('Found links:');
    uniqueLinks.forEach(l => console.log(l));
  } catch (e) {
    console.error(e);
  }
}

run();
