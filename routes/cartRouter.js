const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session');

const store = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017/shopping-app",
    collection: "mySessions"
});

const sessionNew = {
    secret: 'some-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};

app.use(session(sessionNew));

router.get('/:productID', (req, res) => {
    const {productID} = req.params;
    session.cookie.prod.push(productID);
});

router.get('/show', (req, res) => {
    res.render('product', {products: session.cookie.prod});
    store.update(req.session);
});
