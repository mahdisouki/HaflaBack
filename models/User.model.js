const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true},
  commandes:[{type : mongoose.Schema.Types.ObjectId , ref : "commande"}],
},
{
  timestamps: true 
});

module.exports = mongoose.model("user", UserSchema);