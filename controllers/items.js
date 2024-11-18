const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Item = require('../models/item.js')
const router = express.Router();
// ========= Public Routes ===========



// ========= Protected Routes =========
router.use(verifyToken);
// POST - Create
router.post('/', async (req, res) => {
    try {
        req.body.owner = req.user._id;
        const item = await Item.create(req.body);
        item._doc.owner = req.user;
        res.status(201).json(item);
    }catch (error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the item' });
    }
});

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
});

// GET - Show one item by itemId
router.get('/:itemId', async (req, res) => {  
    try {
        const foundItem = await Item.findById(req.params.itemId);
        if (!foundItem) {
            res.status(404);
            throw new Error('Item not found.');
          }
        res.status(200).json(foundItem);
    }catch(error){
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
          }
    }

});







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