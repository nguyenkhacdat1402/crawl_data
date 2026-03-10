const Product = require("../../models/product.model");

module.exports.compareFptshopGet = async (req, res) => {
    const products = await Product.find({ source: "Fpt" }).sort({ createdAt: -1 });

    res.render("client/pages/compare/fptshop", {
        title: "So sánh giá sản phẩm FPTShop",
        productsFpt: products
    });
};

module.exports.compareFptshopPost = async (req, res) => {
    const { product1, product2 } = req.body;

    const detailProduct1 = await Product.findOne({ _id: product1, source: "Fpt" });
    const detailProduct2 = await Product.findOne({ _id: product2, source: "Fpt" });

    res.json({
        code: 200,
        message: "success", 
        data: {
            product1: detailProduct1,
            product2: detailProduct2
        }
    });
};

module.exports.compareCellphonesGet = async (req, res) => {
    const products = await Product.find({ source: "cellphoneS" }).sort({ createdAt: -1 });
    
    res.render("client/pages/compare/cellphones", {
        title: "So sánh giá sản phẩm CellphoneS",
        productsCellphoneS: products
    });
};

module.exports.compareCellphonesPost = async (req, res) => {
    const { product1, product2 } = req.body;

    const detailProduct1 = await Product.findOne({ _id: product1, source: "cellphoneS" });
    const detailProduct2 = await Product.findOne({ _id: product2, source: "cellphoneS" });

    res.json({
        code: 200,
        message: "success", 
        data: {
            product1: detailProduct1,
            product2: detailProduct2
        }
    });
};