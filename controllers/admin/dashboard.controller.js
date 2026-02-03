const { json } = require("express")
const Product = require("../../models/product.model")
const productCellphone = require("../../crawlers/cellPhones/cellphone.product.crawl")
const productFpt = require("../../crawlers/fpt/fpt.product.crawl")

module.exports.dashboard =async (req,res) => {
    res.render("admin/pages/dashboard/index")
}


module.exports.crawl =async (req,res) => {
    try {
        const source = req.body.source

        switch (source) {
            case "cellphones":
                    const resultCellPhone = await productCellphone.detailCellPhone()
                    
                    for (const product of resultCellPhone) {
                        await Product.updateOne({
                            link: product.link, source: product.source
                        },{
                            $set: {
                                name: product.name,
                                start: product.start,
                                totalRating: product.totalRating,
                                category: product.category,
                                basePrice: product.basePrice,
                                newPrice: product.newPrice,
                                specs: product.specs,
                                image: product.image,
                                link: product.linkProduct,
                                source: product.source,
                                crawledAt: new Date()
                            }
                        },
                        { upsert: true }
                        )
                    }
                    
                    res.json({
                        success: true,
                        crawled: resultCellPhone.length
                        });
                break;
            case "fptshop":
                    const resultFpt = await productFpt.detailFpt()

                    for (const product of resultFpt) {
                        await Product.updateOne({
                            link: product.link, source: product.source
                        },{
                            $set: {
                                name: product.name,
                                start: product.start,
                                totalRating: product.totalRating,
                                category: product.category,
                                basePrice: product.basePrice,
                                newPrice: product.newPrice,
                                specs: product.specs,
                                image: product.image,
                                link: product.linkProduct,
                                source: product.source,
                                crawledAt: new Date()
                            }
                        },
                        { upsert: true }
                        )
                    }
                    res.json({
                        success: true,
                        crawled: resultFpt.length
                        });
                break;
            default:
                break;
        }

    } catch (err) {
        res.status(500).json({
        message: err.message
        });
    }
}