const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get All Users
router.get("/", async (req, res) => {
  let searchQueries = {};
  if (req.query.name) {
    searchQueries.name = new RegExp(req.query.name, "g");
  }
  try {
    const users = await User.find(searchQueries);
    res.render("users/usersPage", {
      user: users,
      message: "Creating New User",
    });
  } catch (error) {
    res.render("users/usersPage", {
      user: "could not get user list",
      message: error,
    });
  }
});

//Create New User
router.post("/new", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  try {
    const newUser = await user.save();
    res.render("users/usersPage", {
      user: newUser,
      message: "New User Has Been Created",
    });
  } catch (err) {
    res.render("users/usersPage", {
      message: err,
      user,
    });
  }
});

//Update One User
router.patch("/:id", async (req, res) => {
  const updateValues = { ...req.body };
  let updatedUser;
  try {
    let user = await User.findById(req.params.id);
    for (const key in updateValues) {
      if (user[key]) {
        user[key] = updateValues[key];
      }
    }
    const updatedUser = await user.save();
    res.render("users/usersPage", {
      user: updatedUser,
      message: "user has been updated",
    });
  } catch (err) {
    if (!updatedUser) {
      res.redirect("/");
    } else {
      res.render("users/usersPage", {
        user: updatedUser,
        message: err,
      });
    }
  }
});

//Delete One User
router.delete("/:id", async (req, res) => {
  let deletedUser;
  try {
    deletedUser = await User.findById(req.params.id);
    await user.remove();
    res.render("users/usersPage", {
      user: deletedUser,
      message: "User Has Been Removed",
    });
  } catch (err) {
    if (!deletedUser) {
      res.redirect("/");
    } else {
      res.render("users/usersPage", {
        user: deletedUser,
        message: err,
      });
    }
  }
});

// Delete All Users
// BE CARFULL !

router.delete("/", async (req, res) => {
  try {
    await User.deleteMany({});
    res.render("users/usersPage", {
      user: null,
      message: "All Users Has Been Deleted",
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

module.exports = router;
