const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    type: { type: String, required: true }, // e.g., chair, sofa
    status: { type: String, enum: ['available', 'booked', 'unavailable'], default: 'available' }
});

const showtimeSchema = new mongoose.Schema({
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    availableSeats: { type: Number, default: 0 },
    totalSeats: { type: Number, default: 0 }
});

const screenSchema = new mongoose.Schema({
    cinema_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
    name: { type: String, required: true },
    rows: { type: Number, required: true }, // Number of rows
    columns: { type: Number, required: true }, // Number of columns
    seats: [[seatSchema]], // Nested array representing seating arrangement
    showtimes: [showtimeSchema], // Array of showtimes for movies
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Screen', screenSchema);
