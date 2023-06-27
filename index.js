const express = require("express");
const exphbs = require('express-handlebars');
const app = express();
const conn = require('./db/conn');
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

//controlers
const ToughtController = require("./controllers/ToughtController");

//models route


const ToughtRouter = require("./routes/ToughtRoute");
const AuthRouter = require("./routes/AuthRoute");

//models
const Tought = require("./models/Toughts");
const User = require("./models/User");
const AuthController = require("./controllers/AuthController");
const { checkAuth } = require("./helpers/auth");



//start handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//middlewares
//json request config
app.use(express.urlencoded({
    extends:true
}));
app.use(express.json());
//session
app.use(session({
    name:'session',
    secret:'our_secret',
    resave: false,
    saveUninitialized: false,
    store : new FileStore({
        logFn: function () {},
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true
    }

}))

// FLASH MESSAGES
app.use(flash())

//assets
app.use(express.static('public'));

// session to res
app.use((req,res,next) => {
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})


//routes
app.use('/toughts', ToughtRouter)
app.use('/', AuthRouter)
app.get('/',checkAuth, ToughtController.showAll)

//conection
conn.sync().then(() => {
    app.listen(3000)
})