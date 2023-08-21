const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');

// used for session cookies and authentication passport
const passport =require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash= require('connect-flash');
const customMware = require('./config/middleware');


const sass = require('sass');



// const sassNode = require('node-sass');
// app.use(sassNode({
//     src:'/assets/sass',
//     dest: '/assets/css',
//     debug: true,
//     outputStyle: 'exdended',
//     prefix: '/css'
// }));


app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayout);

// set up and extract style and script from sub pages into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up and view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// const ejsLint = require('ejs-lint');

// mongo store is use to store the session cookies in the db
app.use(session({
    name: 'Codeial',
    secret: 'blahsomething',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/codeial_db', 
            mongooseConnection:db,
            autoRemove:'disabled'
        }, 
        function(err){
            console.log(err || 'connect mongoDB setup ok');
        }
)
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
    console.log(`Error in running the server: ${err}`);
    }
    console.log(`Successfully running on port : ${port}`);
});