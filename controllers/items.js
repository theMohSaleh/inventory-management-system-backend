const e = require('cors');
const Item = require('../models/item.js')
const express = require('express')
router = express.Router();

// GET - Index
router.get('/', async (req, res) => {
    try {
        const itemsFound = await Item.find();
        if (!itemsFound.length) {
            res.status(404);
            throw new Error('No items found');
        }
        res.status(200).json(itemsFound);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message });
        }
    }
})

// POST - Create
router.post('/', async (req, res) => {

})

// PUT - Update
router.put('/', async (req, res) => {

})

// DELETE - Remove
router.delete('/', async (req, res) => {

})

module.exports = router