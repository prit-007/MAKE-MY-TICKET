const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, password, email, role, city } = req.body;
        // Validate role
        if (!['client', 'manager', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const newUser = new User({ username, password, email, role, city });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const bcrypt = require('bcryptjs');

// Signin route
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, 'prit@2004', { expiresIn: '1h' });
        res.status(200).json({ message: 'User signed in successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
