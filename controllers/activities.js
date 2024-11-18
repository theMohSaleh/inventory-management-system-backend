const Activity = require('../models/activity.js')
const express = require('express')
router = express.Router();

// GET - Index
router.get('/', async (req, res) => {
    try {
        const logsFound = await Activity.find();
        if (!logsFound.length) {
            res.status(404);
            throw new Error('No logs found');
        }
        res.status(200).json(logsFound);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message });
        }
    }
})

// GET - get history of item
router.get('/:itemId', async (req, res) => {
    try {
        const logsFound = await Activity.find({item: req.params.itemId});
        if (!logsFound.length) {
            res.status(404);
            throw new Error('No logs found');
        }
        res.status(200).json(logsFound);
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message });
        }
    }
})

module.exports = router