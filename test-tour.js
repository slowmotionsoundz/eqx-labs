const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  await page.goto('file://' + process.cwd() + '/crm.html');
  await page.waitForTimeout(1000);
  
  console.log('Clicking tour button...');
  await page.click('#start-tour-btn').catch(e => console.log('Could not click button', e));
  await page.waitForTimeout(2000);
  
  await browser.close();
})();
