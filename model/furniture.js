
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
    default: false
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Item", ItemSchema);
