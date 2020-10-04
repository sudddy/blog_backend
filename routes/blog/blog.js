var router = require("express").Router();
var BlogInfo = require("./model/blogModel");
var jsonParser = require("body-parser").json();
var mongoose = require("mongoose");
var response = require("../../response/response");

var getAllblogs = async function(req, res, next) {
  try {
    BlogInfo.find({}, function(err, result) {
      if (err) res.send(response.dbError());

      res.send(result);
    });
  } catch (e) {
    next(e);
  }
};

var getBlogsById = async function(req, res, next) {
  let id = req.params.id;
  try {
    BlogInfo.find({ _id: id }, function(err, result) {
      if (err) res.send(response.dbError());

      res.send(result[0]);
    });
  } catch (e) {
    next(e);
  }
};

var getAllBlogsByUserId = async function(req, res, next) {
  let id = req.params.id;

  console.log(id);
  const query = {
    userId: id
  };
  try {
    BlogInfo.find(query, function(err, result) {
      if (err) res.send(response.dbError());

      res.send(result);
    });
  } catch (e) {
    next(e);
  }
};

var addBlog = async function(req, res, next) {
  const blog = req.body;

  try {
    const info = new BlogInfo(blog);
    return info.save(function(err, blogDetails) {
      if (err) res.send(response.dbError());

      res.send(blogDetails);
    });
  } catch (e) {
    next(e);
  }
};

var editblog = async function(req, res, next) {
  const blog = req.body;
  console.log(blog);
  const filter = { _id: blog._id };
  delete blog._id;
  const update = blog;
  try {
    await BlogInfo.update(
      filter,
      { $set: update },
      { returnOriginal: false },
      function(err, result) {
        if (err) res.send(response.dbError());

        res.send(result);
      }
    );
  } catch (e) {
    next(e);
  }
};

var addComments = async function(req, res, next) {
  var blog = req.body;
  var filter;
  if (blog._id) {
    filter = { _id: blog._id };
  }

  if (blog.hasOwnProperty("comments")) {
    if (!blog.comments._id) {
      blog.comments._id = new mongoose.Types.ObjectId();
    }
  }

  delete blog._id;
  const update = blog;
  console.log("update", update);
  BlogInfo.updateOne(filter, { $push: update }, function(err, result) {
    console.log(result);
    res.send(result);
  });
};

var editComments = async function(req, res, next) {
  var blog = req.body;
  var update;
  var filter = {
    _id: blog._id,
    "comments._id": blog.comments._id
  };

  console.log("filter", filter);
  delete blog._id;
  delete blog.comments._id;
  update = blog;
  console.log("update", update);

  try {
    await BlogInfo.update(
      filter,
      { $set: { "comments.$.image": update.comments.image } },
      { returnOriginal: false },
      function(err, result) {
        if (err) res.send(response.dbError());

        res.send(result);
      }
    );
  } catch (e) {
    next(e);
  }
};

router.get("/list", getAllblogs);

router.get("/listbyId/:id*", getBlogsById);

router.get("/listBlogsByUserId/:id*", getAllBlogsByUserId);

router.post("/addBlog", jsonParser, addBlog);

router.put("/editBlog", jsonParser, editblog);

router.post("/addComment", jsonParser, addComments);

router.put("/editComment", jsonParser, editComments);

module.exports = router;
