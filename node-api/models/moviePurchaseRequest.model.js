const mongoose = require('mongoose');

const moviePurchaseRequestSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
    requestDetails: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who generated the request
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoviePurchaseRequest', moviePurchaseRequestSchema);
