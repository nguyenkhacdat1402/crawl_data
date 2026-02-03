const { default: mongoose } = require("mongoose")

const accountSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        phone: String,
        status: String,
        deleted: {type: Boolean, default: false}, 
    },
    {
        timestamps: true
    }
)

const Account = mongoose.model('Account', accountSchema, "accounts" )

module.exports = Account;