const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route  GET api/items
// @desc   Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 }) // -1 for descending order
        .then(items => res.json(items));
});

// @route  POST api/items
// @desc   Create An Item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
    });

    newItem
        .save()
        .then(items => res.json(items))
        .catch(err => console.log("error in create post ", err));
});

// @route  DELETE api/items
// @desc   Delete An Item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(() => res.status(404).json({ success: false }));
})

module.exports = router;