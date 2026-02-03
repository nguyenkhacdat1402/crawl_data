const { json } = require("express")
const bcrypt = require("bcrypt")
const Account = require("../../models/account.model")
const jwt = require("jsonwebtoken")

module.exports.login =async (req,res) => {
    res.render("admin/pages/auth/login")
}

module.exports.postLogin =async (req,res) => {
    const user = await Account.findOne({
        email: req.body.email,
        deleted: false
    })

    if (!user) {
        req.flash("error", "Email không tồn tại")
        res.redirect("/admin/auth/login")
        return
    }

    const checkPass = await bcrypt.compare(req.body.password, user.password)
    if (!checkPass) {
        req.flash("error", "Mật khẩu không đúng")
        res.redirect("/admin/auth/login")
        return
    }

    const tokenAdmin = jwt.sign({id: user.id, fullName: user.fullName}, process.env.SECRET_KEY, {expiresIn: '2h'})
    res.cookie("tokenAdmin", tokenAdmin)

    res.redirect("/admin/dashboard")
}


module.exports.logout =async (req,res) => {
    try {
        res.clearCookie("tokenAdmin")
        res.redirect("/admin/dashboard")
    } catch (error) {
        res.send("lỗi hệ thống")
    }
}
