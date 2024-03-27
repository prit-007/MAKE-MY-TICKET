const express = require('express');
const router = express.Router();
const Cinema = require('../models/cinema.model');


router.post('/cinemas', async (req, res) => {
    try {
        const newCinema = new Cinema(req.body);
        await newCinema.save();
        res.status(201).json(newCinema);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all cinemas
router.get('/cinemas', async (req, res) => {
    try {
        const cinemas = await Cinema.find();
        res.json(cinemas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single cinema by ID
router.get('/cinemas/:id', async (req, res) => {
    try {
        const cinema = await Cinema.findById(req.params.id);
        if (!cinema) {
            return res.status(404).json({ message: 'Cinema not found' });
        }
        res.json(cinema);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a cinema by ID
router.put('/cinemas/:id', async (req, res) => {
    try {
        const updatedCinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCinema);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a cinema by ID
router.delete('/cinemas/:id', async (req, res) => {
    try {
        const deletedCinema = await Cinema.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cinema deleted', cinema: deletedCinema });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;