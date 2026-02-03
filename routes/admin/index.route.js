const dashboardRouter = require("./dashboard.route");
const accountdRouter = require("./account.route");
const authdRouter = require("./auth.route");
const adminMiddleware = require("../../middlewares/admin/auth.middleware")

module.exports = (app) =>{
    app.use("/admin/dashboard", adminMiddleware.authenticationAdmin,  dashboardRouter);
    app.use("/admin/accounts", adminMiddleware.authenticationAdmin, accountdRouter);
    app.use("/admin/auth", authdRouter);
    
};