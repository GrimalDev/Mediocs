/* initializing dev or production status */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

/* -------------require packages---------------- */
const express = require('express') //server package
const bcrypt = require('bcrypt') //hash package
const dataStore = require('nedb') //databse package
const session = require('express-session') //session package
const cookieParser = require('cookie-parser') //to manage cookies
const flash = require('connect-flash') //flash for messages package
const passport = require('passport') //passport package
const LocalStrategy = require('passport-local').Strategy; //package to set passport to use local database for users passwords
const methodOverride = require('method-override') //method-override IMPORTANT /!\
const fs = require('fs') //file-system package to read external files and initialize file in a function
const key = fs.readFileSync('./key.pem', 'utf8') // ssl key
const cert = fs.readFileSync('./cert.pem', 'utf8') // ssl certificate
const https = require('https') // library for https connections

/* -------------define packages----------------- */
const app = express()
const server = https.createServer({key: key, cert: cert }, app) // define https server

/* -------------needed variables---------------- */
const port = 8080 /* test listen port */
const sessionSecret = process.env.SESSION_SECRET
const cookieSecret = process.env.COOKIE_SECRET
const adminSecret = process.env.ADMIN_SECRET

/* -------------content------------------------- */

/* communication option */
app.use(express.urlencoded({
    extended: false
}))
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))
app.use(cookieParser(cookieSecret))
app.use(flash())
app.use(function(req, res, next) {
    res.locals.message = req.flash();
    next();
 });
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.json());

/* setup public static root directory */
app.use(express.static(__dirname + "/public", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));

app.set('views', './views/'); // set the view root folder for the ejs engine
app.set('view engine', 'ejs'); // set the express render engine as ejs

/* Database conf */
const user_database = new dataStore('./app/DATA/user_data/main_user_data.db')
const med_database = new dataStore('./app/DATA/medical/med_data_1.db')

/* load database */
user_database.loadDatabase()
med_database.loadDatabase()

/* -------------------- */

require('./app/config/passport-config')(passport, LocalStrategy, bcrypt, user_database)
require('./app/routes.js')(app, passport, fs, bcrypt, adminSecret, user_database)

// add admin user to database


/* initialize server listener */

  /* app setup */
app.listen(port, function(error) {
    if (error) {
        console.log("Error:", error) /* catch for errors in a nice way */
    } else {
        console.log("app up and runing and listening on port", port) /* run success log */
    }
}); /* start to listen for requests on ${port}*/