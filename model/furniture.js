
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["modern", "classic", "rustic"],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  discountPrice: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  inStock: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Item", ItemSchema);
