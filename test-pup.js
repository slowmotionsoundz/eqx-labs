const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('http://localhost:8000/crm.html', { waitUntil: 'networkidle0' });
  
  console.log("Clicking pipeline tab...");
  await page.click('#sidebar-tab-pipeline');
  
  // wait a bit
  await new Promise(r => setTimeout(r, 500));
  
  console.log("Checking if pipeline tab is active...");
  const pipelineClass = await page.$eval('#crm-tab-pipeline', el => el.className);
  console.log("Pipeline class:", pipelineClass);
  
  const pipelineContent = await page.$eval('#crm-tab-pipeline', el => el.innerHTML.length);
  console.log("Pipeline content length:", pipelineContent);
  
  await browser.close();
})();
