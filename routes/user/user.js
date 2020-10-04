var router = require("express").Router();
var Users = require("./model/user");
var jsonParser = require("body-parser").json();
const response = require("../../response/response");

var signup = async function(req, res, next) {
  let isExistingUser = false;
  let user = req.body;
  console.log("user", user);
  const email = user.email;

  if (!email) {
    return res.send({
      code: response.code.INVALID_PARAMETERS,
      message: response.message.EMAIL_REQUIRED
    });
  }

  isExistingUser = await Users.findOne({ email }).then(user => {
    console.log("user", user);
    if (user) {
      return true;
    }
  });

  if (isExistingUser) {
    return res.send({
      code: response.code.PERMISSION_DENIED,
      message: response.message.USER_EXISTS
    });
  }

  if (!user.password) {
    return res.send({
      code: response.code.INVALID_PARAMETERS,
      message: response.message.PASSWORD_REQUIRED
    });
  }

  let finalUser = new Users(user);
  return finalUser.save().then(() =>
    res.send({
      code: response.code.DATA_SUCCESS,
      message: response.message.USER_CREATED
    })
  );
};

var login = async function(req, res, next) {
  let isLoggedIn = false;

  let user = req.body;
  console.log("user", user);
  const email = user.email;

  var isExistingUser = await Users.findOne({ email }).then(dbuser => {
    console.log("user", user);
    if (dbuser) {
      if (dbuser.password === user.password) {
        isLoggedIn = true;
        return dbuser;
      }
    }
  });

  if (isLoggedIn) {
    return res.send({
      user: isExistingUser,
      message: "logged in"
    });
  } else {
    return res.send({
      code: response.code.PERMISSION_DENIED,
      message: response.message.USER_EXISTS
    });
  }
};

var editProfile = async function(req, res, next) {
  const profile = req.body;
  console.log(profile);
  const filter = { _id: profile._id };
  delete profile._id;
  const update = profile;
  try {
    console.log("update", profile);
    console.log("fileter", filter);
    await Users.update(
      filter,
      { $set: update },
      { returnOriginal: false },
      function(err, result) {
        if (err) res.send(response.dbError());

        console.log(result);
        res.send(result);
      }
    );
  } catch (e) {
    next(e);
  }
};

var getUserById = async function(req, res, next) {
  let id = req.params.id;
  console.log(id);
  try {
    Users.find({ _id: id }, function(err, result) {
      if (err) res.send(response.dbError());

      res.send({ user: result[0] });
    });
  } catch (e) {
    next(e);
  }
};

router.post("/signup", jsonParser, signup);
router.post("/login", jsonParser, login);
router.put("/editProfile", jsonParser, editProfile);
router.get("/getUser/:id*", jsonParser, getUserById);

module.exports = router;
