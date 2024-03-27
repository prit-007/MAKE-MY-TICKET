const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
    screenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
    seats: [{ type: String, required: true }],
    totalPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
