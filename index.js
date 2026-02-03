const express = require('express');
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session');
const cookieParser = require('cookie-parser')

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

dotenv.config();
database.connect();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json());

app.use(session({
    secret: 'mysecretkey',   
    resave: false,           
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))
app.use(flash())
app.use(cookieParser())

const port = process.env.PORT;

route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
