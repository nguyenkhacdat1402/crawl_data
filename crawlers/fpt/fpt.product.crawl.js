const scrapeLinks = require("../../helpers/crawl/crawlListLinks")
const puppeteer = require("puppeteer");

module.exports.detailFpt = async () => {
    const links = await scrapeLinks.scrapeLink(  
        "https://fptshop.com.vn/dien-thoai/apple-iphone",
        "button.Button_root__LQsbl.Button_btnSmall__aXxTy.Button_whitePrimary__nkoMI.Button_btnIconRight__4VSUO",
        'div.relative.flex.items-center.justify-between a.flex-1[href]'
    )

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    const results = []

    for (const link of links.slice(0, 10)) {
        await page.goto(link);

        const btn = await page.$("span.text-textOnWhiteBrand.b2-medium");
        if (btn) {
            await btn.click();
            await new Promise(resolve => setTimeout(resolve , 2000));
        }
        const data = await page.evaluate(() => {
            let name = document.querySelector("h1.text-textOnWhitePrimary.b2-medium")?.textContent; 
            let start = document.querySelector("div.text-textOnWhitePrimary.b2-regular")?.textContent;
            let totalRating = document.querySelector("div.f1-medium")?.textContent;
            let basePrice = document.querySelector("span.line-through")?.textContent;
            let newPrice = document.querySelector("span.h4-bold")?.textContent;


            let specs = Array.from(document.querySelectorAll(".border-dashed.border-b-iconDividerOnWhite")).map(item => ({
                label: item.querySelector("div.text-textOnWhiteSecondary")?.textContent,
                value: item.querySelector(".flex-1")?.textContent
            }))

            let image = document.querySelector("img.ThumbsSwiperVer2_imgDefault__1ZdAE")?.src;

            let categories = Array.from(document.querySelectorAll("li.inline-flex.items-center a"))
            .map(a => a.textContent.trim());
            let category = categories[2]
            switch (category) {
                case "Apple (iPhone)": 
                    category = "Apple"
                    break;
                default:
                    break;
            }

            return {
                name,
                start,
                totalRating,
                basePrice,
                newPrice,
                specs,
                image,
                category,
            }
        })
        data.link = link
        data.source =  "Fpt"
        if (!data.name) {
            continue;
        }
        results.push(data)
    }


    await browser.close();
    return results
}


