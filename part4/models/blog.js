const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, newObject) => {
    newObject.id = newObject._id.toString();
    delete newObject._id;
    delete newObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
