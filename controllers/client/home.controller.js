const { json } = require("express")
const Product = require("../../models/product.model")

module.exports.index =async (req,res) => {
    const productsCellphoneS = await Product.find({
        source: "cellphoneS"
    })

    const productsFpt = await Product.find({
        source: "Fpt"
    })

    res.render("client/pages/detail",{
        productsCellphoneS,
        productsFpt
    })
}

module.exports.compare =async (req,res) => {

    const idProductCellphones = req.body.idProductCellphoneS
    const idProductFpt = req.body.idProductFpt

    const productCellphones = await Product.findOne({
        _id : idProductCellphones,
        source: "cellphoneS"
    })

    const productFpt = await Product.findOne({
        _id : idProductFpt,
        source: "Fpt"
    })

    res.json({
        code: 200,
        message: "success",
        data: {
            productCellphones,
            productFpt
        }
    })
}