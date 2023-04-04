const express = require("express");
const router = express.Router();
const userModel = require("../models/User");

router.get('/register', (req, res) => {
    res.render("auth/register");
});

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    req.flash("You have registered successfully!");
    const user = new userModel ({
        username, email
    });

    const createdUser = await userModel.register(user, password);
    res.send(createdUser);
});

// router.get('/fakeUser', async (req, res) => {
//     const createdUser = new userModel({
//         username: "my_username",
//         email: "someemail@email.com",
//     });
//
//     const newUser = await userModel.register(createdUser, "my_password");
//
//     res.send(newUser);
// })

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const { user } = await userModel.authenticate()(username, password);
    res.send(user);
})

module.exports = router;