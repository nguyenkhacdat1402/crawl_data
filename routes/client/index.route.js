const homeRouter = require("./home.route");
const compareRouter = require("./compare.route");
module.exports = (app) =>{
    app.use("/", homeRouter)
    app.use("/compare", compareRouter)
};