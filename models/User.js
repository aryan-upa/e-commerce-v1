const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const schema = new mongoose.Schema ({
    // username: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    email: String,
});

schema.plugin(passportLocalMongoose);

const model = mongoose.model("User", schema);
module.exports = model;