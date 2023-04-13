const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");
const PORT = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require("connect-flash");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/User");
const cookieParser = require("cookie-parser");

const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const authRouter = require('./routes/authRoutes');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/shopping-app').then(() => {
    console.log('Database Connected!');
}).catch(() => {
    console.log('Database could not connect');
});

const Store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    collection: 'mySessions'
});

app.set('view engine', "ejs");
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', [
    path.join(__dirname, "views"),
    path.join(__dirname, "views", "products")
]);

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: false
    },
    Store: Store
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.get('/', (req, res) => {
    res.render('index');
});

app.use("/products", productRouter);
app.use("/reviews", reviewRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log("Listening to port 3000!");
});


