const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'client'], required: true },
    city: { type: String },
    likedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    bookedTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    pastBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    createdAt: { type: Date, default: Date.now }, // Created at field
    updatedAt: { type: Date, default: Date.now } // Updated at field
});

// Update updatedAt field before saving the document
userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('User', userSchema);
