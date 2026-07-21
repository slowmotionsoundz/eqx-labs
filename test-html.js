const fs = require('fs');
const html = fs.readFileSync('crm.html', 'utf8');
const scriptMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (scriptMatch) {
  fs.writeFileSync('extracted-script.js', scriptMatch[1]);
  console.log("Extracted");
}
