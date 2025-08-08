require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize Express
const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const hostname = process.env.HOST;
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Welcome to labphase server!');
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log('Press Ctrl+C to stop the server.');
    console.log('Press Ctrl+R to restart the server.');
    console.log('Waiting for requests...');
});