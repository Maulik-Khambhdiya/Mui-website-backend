const mongoose = require("mongoose");

const offerSchema = mongoose.Schema({
  offerType: {
    type: String,
    enum: ["headerOffer", "heroBanner", "mainBanner"],
    required: true,
  },
  text: {
    type: String,
    required: function () {
      return this.offerType === "headerOffer";
    },
  },
  imageUrl: {
    type: String,
    required: function () {
      return this.offerType  !== "headerOffer";
    },
  },
});

module.exports = mongoose.model('offer',offerSchema);
