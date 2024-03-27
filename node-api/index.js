const express = require('express');

const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/filmexify'
mongoose.connect(mongoUrl).then(() => {

    console.log('connected to mongoDB');
    const bookingController = require('./routes/booking.route');
    const movieController = require('./routes/movie.route');
    const clientController = require('./routes/client.route');
    const managerController = require('./routes/manager.route');
    const cinemaController = require('./routes/cinema.route');
    const authController = require('./routes/auth.route');
    const userController = require('./routes/user.crud.route');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    //express
    const app = express();

    //bodyparser middleware
    app.use(bodyParser.json());

    //CORS middleware
    app.use(cors());
    
    //routes
    app.use('/auth', authController)
    app.use('/user', userController)
    app.use('/manager', managerController)
    app.use('/client', clientController)
    app.use('/admin/movies', movieController)
    app.use('/admin/cinema', cinemaController);
    app.use('/bookings', bookingController);

    const PORT = process.env.PORT || 1969;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
