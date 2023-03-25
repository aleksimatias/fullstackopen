const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((sum, post) => sum + post.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;

  const favorite = blogs.reduce((last, curr) => {
    return curr.likes > last.likes ? curr : last;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const blogsByAuthors = lodash.countBy(blogs, "author");
  const commonAuthor = Object.keys(blogsByAuthors).reduce((a, b) => {
    return blogsByAuthors[a] > blogsByAuthors[b] ? a : b;
  });

  return {
    author: commonAuthor,
    blogs: blogsByAuthors[commonAuthor],
  };
};

const mostLikes = (blogs) => {
  const numOfLikes = lodash(blogs)
    .groupBy("author")
    .map((likes, author) => ({
      author: author,
      likes: lodash.sumBy(likes, "likes"),
    }))
    .value();

  return numOfLikes.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  });
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
