const express = require('express');
const router = express.Router();
const Moved = require('../Models/Moved.model');

// GET ALL moved with a specific userId
router.get('/:userId', async (req, res) => {
    try {
        const moved = await Moved.find({ userId: req.params.userId });
        res.json(moved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific moved
router.get('/:id', getMoved, (req, res) => {
    res.json(res.moved);
});

// CREATE a new moved
router.post('/', async (req, res) => {
    const moved = new Moved({
        userId: req.body.userId,
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description,
    });

    try {
        const newMoved = await moved.save();
        res.status(201).json(newMoved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE a moved
router.patch('/:id', getMoved, async (req, res) => {
    if (req.body.type != null) {
        res.moved.type = req.body.type;
    }
    if (req.body.amount != null) {
        res.moved.amount = req.body.amount;
    }
    if (req.body.description != null) {
        res.moved.description = req.body.description;
    }

    try {
        const updatedMoved = await res.moved.save();
        res.json(updatedMoved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a moved
router.delete('/:id', getMoved, async (req, res) => {
    try {
        await res.moved.remove();
        res.json({ message: 'Deleted Moved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// middleware function to get moved by id
async function getMoved(req, res, next) {
    let moved;
    try {
        moved = await Moved.findById(req.params.id);
        if (moved == null) {
            return res.status(404).json({ message: 'Cant find moved' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.moved = moved;
    next();
}