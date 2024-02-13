import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Popover holder', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  test('show page', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.wiget-button');
  });

  test('show popover', async () => {
    await page.goto(baseUrl);

    const button = await page.$('.wiget-button');
    await button.click();
    await page.waitForSelector('.popover');
  });

  test('remove popover', async () => {
    const popover = await page.evaluate(() => {
      const button = document.querySelector(".wiget-button");
      button.click();
      return document.querySelector('.popover');
    });
    expect(popover).toBeNull();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

});