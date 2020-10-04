var app = require("express")();
var cors = require("cors");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoDBConnection = require("./mongo/mongo");

var port = process.env.PORT || 8080;

(function utils() {
  mongoDBConnection(); // Mongo DB
  app.use(cors()); // Cross origin
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use(logger("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
})();

(function routingRequests() {
  const blogRouter = require("./routes/blog/blog");
  const userRouter = require("./routes/user/user");

  app.use("/blog/", blogRouter);
  app.use("/user/", userRouter);
})();

app.listen(port, function() {
  console.log("Runnning on " + port);
});

module.exports = app;
