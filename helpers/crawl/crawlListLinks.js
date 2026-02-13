const puppeteer = require("puppeteer")

module.exports.scrapeLink = async (url, clickShowMore, getLink) => { 
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);

    for (let i = 0; i < 30; i++) {
      const btn = await page.$(clickShowMore);
      if (!btn) break;

      await btn.click();
      await new Promise(resolve => setTimeout(resolve , 2000));
    }
    
    const links = await page.$$eval(
      getLink,
      els => [...new Set(
        els.map(el => new URL(el.href, location.origin).href)
      )]
    );

    browser.close();

    return links;
}

