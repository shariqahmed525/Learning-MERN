const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route  POST api/auth
// @desc   Auth user
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    res.status(400).json({ msg: "All fields must be required!" });
  };

  // Check for existing user
  User.findOne({ email })
    .then(async user => {
      if (!user) {
        return res.status(400).json({ msg: "User dosen't exists" });
      }

      // Validate Password
      const compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        return res.status(400).json({ msg: "Invalid Credientials" });
      }

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
    })
});

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
    .catch(() => res.status(404).json({ success: false }));
})

module.exports = router;