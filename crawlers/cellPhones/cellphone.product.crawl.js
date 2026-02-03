const scrapeLinks = require("../../helpers/crawl/crawlListLinks")
const puppeteer = require("puppeteer");

module.exports.detailCellPhone = async () => {
    const links = await scrapeLinks.scrapeLink(  
        "https://cellphones.com.vn/mobile/apple.html",
        "a.btn-show-more.button__show-more-product",
        "a.product__link.button__link[href]"
    )

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    const results = []

    for (const link of links.slice(0, 10)) {
        await page.goto(link);

        const data = await page.evaluate(() => {
            let name = document.querySelector(".box-product-name h1")?.textContent;
            let start = document.querySelector(".box-rating span")?.textContent;
            let totalRating = document.querySelector(".box-rating span.total-rating")?.textContent;
            let basePrice = document.querySelector(".base-price")?.textContent;
            let newPrice = document.querySelector(".sale-price")?.textContent.trim();

            let specs = Array.from(document.querySelectorAll(".technical-content-item")).map(item => ({
                label: item.querySelector("td")?.textContent,
                value: item.querySelector("p")?.textContent
            }))

            let image = document.querySelector(".swiper-slide img").getAttribute("src");

            let categories = Array.from(document.querySelectorAll("div.block-breadcrumbs a.button__breadcrumb-item"))
            .map(a => a.textContent.trim());
            let category = categories[1]
            return {
                name,
                start,
                totalRating,
                basePrice,
                newPrice,
                specs,
                image,
                category
            }
        })
        data.link = link;
        data.source =  "cellphoneS"
        if (!data.name) {
            continue;
        }
        results.push(data)
    }


    await browser.close();
    return results
}


