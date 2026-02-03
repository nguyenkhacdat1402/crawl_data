const { json } = require("express")
const bcrypt = require("bcrypt")
const Account = require("../../models/account.model")
const productCellphone = require("../../crawlers/cellPhones/cellphone.product.crawl")
const productFpt = require("../../crawlers/fpt/fpt.product.crawl")

module.exports.create = (req,res) => {
    res.render("admin/pages/accounts/create")
}

module.exports.createPost =async (req,res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10)
        
        const exitEmail = await Account.findOne({
            email: req.body.email,
            deleted: false
        })

        if (exitEmail) {
            req.flash("error", "Email đã tồn tại")
            res.redirect("/admin/accounts/create")
            return
        }

        const account = new Account({
            fullName: req.body.fullName,
            email: req.body.email,
            password: password,
            phone: req.body.phone
        })

        await account.save()

        req.flash("success", "Tạo tài khoản thành công")
        res.redirect("/admin/accounts/create")
    } catch (error) {
        console.log(error)
        res.send("lỗi hệ thống")
    }
}

module.exports.user = async (req,res) => {
    const users = await Account.find({
        deleted: false
    })
    res.render("admin/pages/accounts/user",{
        users: users
    })
}
