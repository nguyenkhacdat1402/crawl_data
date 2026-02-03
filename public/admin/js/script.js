
async function crawl(source) {
    const log = document.getElementById("log");
    log.innerText = " Đang crawl dữ liệu từ " + source + "...";

    try {
        const res = await fetch("/admin/dashboard/crawl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            source: source
            })
        });

        const data = await res.json();

        if (data.success) {
            log.innerText =
            "✅ Crawl thành công\n" +
            "Website: " + source + "\n" +
            "Tổng sản phẩm: " + data.crawled;
        } else {
            log.innerText = "❌ Crawl thất bại";
        }
    } catch (err) {
        log.innerText = "❌ Lỗi khi crawl";
    }
}