// client.routes.js

const express = require('express');
const router = express.Router();
const Screen = require('../models/screen.model');

// Get all screens for a cinema
router.get('/cinemas/:cinemaId/screens', async (req, res) => {
    try {
        const screens = await Screen.find({ cinema_id: req.params.cinemaId });
        // You may want to format the response to only include necessary information for the client
        res.json(screens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all showtimes for a screen
router.get('/screens/:screenId/showtimes', async (req, res) => {
    try {
        const screen = await Screen.findById(req.params.screenId);
        if (!screen) {
            return res.status(404).json({ message: 'Screen not found' });
        }
        // Extract and return only showtimes
        const showtimes = screen.showtimes.map(showtime => ({
            movieId: showtime.movieId,
            startTime: showtime.startTime,
            endTime: showtime.endTime,
            availableSeats: showtime.availableSeats
        }));
        res.json(showtimes);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

module.exports = router;
