const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    adult: { type: Boolean, required: true },
    belongsToCollection: { type: mongoose.Schema.Types.Mixed },
    budget: { type: Number, required: true },
    genres: [{ id: Number, name: String }],
    homepage: { type: String },
    tmdbId: { type: Number, required: true },
    imdbId: { type: String, required: true },
    originalLanguage: { type: String, required: true },
    originalTitle: { type: String, required: true },
    overview: { type: String, required: true },
    popularity: { type: Number, required: true },
    posterPath: { type: String },
    productionCompanies: [{ name: String, id: Number }],
    productionCountries: [{ iso_3166_1: String, name: String }],
    releaseDate: { type: Date, required: true },
    revenue: { type: Number, required: true },
    runtime: { type: Number },
    spokenLanguages: [{ iso_639_1: String, name: String }],
    status: { type: String, required: true },
    tagline: { type: String },
    title: { type: String, required: true },
    video: { type: Boolean, required: true },
    voteAverage: { type: Number, required: true },
    voteCount: { type: Number, required: true }
});

module.exports = mongoose.model('Movie', movieSchema);
