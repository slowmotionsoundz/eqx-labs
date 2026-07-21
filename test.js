const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('crm.html', 'utf8');
const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
const window = dom.window;

window.addEventListener('error', (event) => {
  console.log('DOM Error:', event.error);
});

setTimeout(() => {
    try {
        console.log("Dashboard active class:", window.document.getElementById('crm-tab-dashboard').className);
        console.log("Clicking pipeline tab...");
        window.document.getElementById('sidebar-tab-pipeline').click();
        console.log("Pipeline active class:", window.document.getElementById('crm-tab-pipeline').className);
        console.log("Dashboard active class:", window.document.getElementById('crm-tab-dashboard').className);
        console.log("Pipeline content length:", window.document.getElementById('crm-tab-pipeline').innerHTML.length);
    } catch(e) {
        console.log("Error during click:", e);
    }
}, 1000);
