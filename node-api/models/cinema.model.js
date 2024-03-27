const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    manager_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['approved', 'pending'], default: 'pending' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cinema', cinemaSchema);
