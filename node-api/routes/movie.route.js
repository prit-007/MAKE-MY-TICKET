const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.model');
const MoviePurchaseRequest = require('../models/moviePurchaseRequest.model');

// Get all movies with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameters, default to 1
    const limit = 30; // Get the limit default to 30
    const skip = (page - 1) * limit; 
    try {
        const movies = await Movie.find().skip(skip).limit(limit);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new movie
router.post('/', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a movie by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted', movie: deletedMovie });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all movie purchase requests
router.get('/movie-requests', async (req, res) => {
    try {
        const movieRequests = await MoviePurchaseRequest.find();
        res.json(movieRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Accept a movie purchase request
router.put('/movie-requests/:id/accept', async (req, res) => {
    try {
        const request = await MoviePurchaseRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        // Update the status of the request to 'approved'
        request.status = 'approved';
        await request.save();
        res.json({ message: 'Request accepted', request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Decline a movie purchase request
router.put('/movie-requests/:id/decline', async (req, res) => {
    try {
        const request = await MoviePurchaseRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        // Update the status of the request to 'rejected'
        request.status = 'rejected';
        await request.save();
        res.json({ message: 'Request declined', request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
