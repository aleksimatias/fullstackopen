const blogRouter = require("express").Router();
const Blog = require("../models/blog");

// Get all blogs
blogRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

// Add new blog
blogRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogRouter;
