// manager.routes.js

const express = require('express');
const router = express.Router();
const Screen = require('../models/screen.model');

// Create a new screen for a cinema
router.post('/cinemas/:cinemaId/screens', async (req, res) => {
    try {
        const newScreen = new Screen({ ...req.body, cinemaId: req.params.cinemaId });
        await newScreen.save();
        res.status(201).json(newScreen);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all screens for a cinema
router.get('/cinemas/:cinemaId/screens', async (req, res) => {
    try {
        const screens = await Screen.find({ cinemaId: req.params.cinemaId });
        res.json(screens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single screen by ID
router.get('/screens/:id', async (req, res) => {
    try {
        const screen = await Screen.findById(req.params.id);
        if (!screen) {
            return res.status(404).json({ message: 'Screen not found' });
        }
        res.json(screen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a screen by ID
router.put('/screens/:id', async (req, res) => {
    try {
        const updatedScreen = await Screen.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedScreen);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a screen by ID
router.delete('/screens/:id', async (req, res) => {
    try {
        const deletedScreen = await Screen.findByIdAndDelete(req.params.id);
        if (!deletedScreen) {
            return res.status(404).json({ message: 'Screen not found' });
        }
        res.json({ message: 'Screen deleted', screen: deletedScreen });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a movie to a screen
router.post('/screens/:screenId/movies', async (req, res) => {
    const { movieId, startTime, endTime, totalSeats } = req.body;

    try {
        const screen = await Screen.findById(req.params.screenId);
        if (!screen) {
            return res.status(404).json({ message: 'Screen not found' });
        }

        // Check if the movie is already added to the screen for the given showtime
        const existingShowtime = screen.showtimes.find(st => st.movieId.toString() === movieId && st.startTime.toString() === startTime && st.endTime.toString() === endTime);
        if (existingShowtime) {
            return res.status(400).json({ message: 'Movie is already added to the screen for the given showtime' });
        }

        // Add the movie to the screen
        screen.showtimes.push({ movieId, startTime, endTime, availableSeats: totalSeats, totalSeats });
        await screen.save();

        res.status(201).json(screen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update movie details on a screen
router.put('/screens/:screenId/movies/:movieId', async (req, res) => {
    const { startTime, endTime } = req.body;

    try {
        const screen = await Screen.findById(req.params.screenId);
        if (!screen) {
            return res.status(404).json({ message: 'Screen not found' });
        }

        // Find the showtime for the given movie
        const showtime = screen.showtimes.find(st => st.movieId.toString() === req.params.movieId);
        if (!showtime) {
            return res.status(404).json({ message: 'Movie not found on the screen' });
        }

        // Update the showtime details
        showtime.startTime = startTime;
        showtime.endTime = endTime;
        await screen.save();

        res.json(screen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove a movie from a screen
router.delete('/screens/:screenId/movies/:movieId', async (req, res) => {
    try {
        const screen = await Screen.findById(req.params.screenId);
        if (!screen) {
            return res.status(404).json({ message: 'Screen not found' });
        }

        // Remove the movie from the screen's showtimes
        screen.showtimes = screen.showtimes.filter(st => st.movieId.toString() !== req.params.movieId);
        await screen.save();

        res.json(screen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
