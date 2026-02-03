const jwt = require("jsonwebtoken")

module.exports.authenticationAdmin = (req,res,next) => {
    const tokenAdmin = req.cookies.tokenAdmin

    if (!tokenAdmin) {
        res.redirect("/admin/auth/login")
        return
    }

    const decode = jwt.verify(tokenAdmin, process.env.SECRET_KEY)
    req.user = decode   

    res.locals.user = decode
    res.locals.fullName = decode.fullName

    next()
}

