const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");
const PORT = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/shopping-app').then(() => {
    console.log('Database Connected!');
}).catch(() => {
    console.log('Database could not connect');
});

app.set('view engine', "ejs");
app.engine("ejs", engine);
app.set('views', [
    path.join(__dirname, "views"),
    path.join(__dirname, "views", "products")
]);
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('index');
});

app.use("/products", productRouter);
app.use("/reviews", reviewRouter);

app.listen(PORT, () => {
    console.log("Listening to port 3000!");
});


