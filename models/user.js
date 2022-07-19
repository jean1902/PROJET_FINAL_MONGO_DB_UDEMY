const mongoose =require("mongoose");
const passportLocalMongoose =require("passport-local-mongoose");

const NewSchema = new mongoose.Schema({
    username:String ,
    password:String
})
NewSchema.plugin(passportLocalMongoose) ; // vapermettre de hascher le mot de pass et le salter

module.exports = mongoose.model("User", NewSchema);
