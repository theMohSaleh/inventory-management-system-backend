const Item = require('../models/item.js')
const express  = require('express')
router = express.Router();

// GET - Index
router.get('/', async (req, res) => {

})

// POST - Create
router.post('/', async (req, res) => {

})

// PUT - Update
router.put('/', async (req, res) => {

})

// DELETE - Remove
router.delete('/', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete({ _id: req.params.itemId })
        if (!deletedItem) {
            res.status(404)
            throw new Error('Item not found.')
        }
        res.status(200).json(deletedItem)
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message })
        }
    }
})

module.exports = router