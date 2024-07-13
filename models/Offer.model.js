const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: String}],
  dispDays: [{ type: String, required: true}],
  commandes:[{type : Number , required:true}]
},
{
  timestamps: true 
});

module.exports = mongoose.model("offre", OfferSchema);