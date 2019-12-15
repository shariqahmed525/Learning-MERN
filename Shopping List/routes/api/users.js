const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

// User Model
const User = require('../../models/User');

// @route  POST api/users
// @desc   Register new user
// @access Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    res.status(400).json({ msg: "All fields must be required!" });
  };

  // Check for existing user
  User.findOne({ email })
    .then(async user => {
      if (user) {
        return res.status(400).json({ msg: "User already exist" });
      }

      const hash = hashPassword(password);

      const newUser = new User({
        name,
        email,
        password: hash,
      });

      try {
        const user = await newUser.save()

        jwt.sign(
          { id: user.id },
          "jwtSecret",
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw new Error(err);
            res.json({
              user,
              token,
            })
          }
        )
      }
      catch (e) {
        console.log("error in register user ", e);
      }
    })
});


module.exports = router;