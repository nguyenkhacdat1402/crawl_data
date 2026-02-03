const { default: mongoose } = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: String,
        start: String,
        totalRating: String,
        basePrice: String,
        newPrice: String,
        specs: [{
            label: String,
            value: String
            }
        ],
        image: String,
        category: String,
        link: String,
        source: String
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema, "products" )

module.exports = Product;