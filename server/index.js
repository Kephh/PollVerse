const mongoose = require('mongoose');
const pollRouter = require('./routes/pollRoutes');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors'); // Fixed: use lowercase 'cors'
const app = express();

// Use express.json() to parse JSON bodies
app.use(express.json());
app.use(cors()); // Fixed: use lowercase 'cors'

// Use helmet for security headers
app.use(helmet());

// Use morgan for logging HTTP requests
app.use(morgan('dev'));

app.get('/test', (req, res) => {
    res.send('Test connection!');
});

app.use('/polls', pollRouter);

const startServer = () => {
    app.listen(8000, () => {
        console.log('Started listening on PORT 8000!');
    });
};

mongoose.connect('mongodb://localhost:27017/pollverse')
    .then(() => {
        console.log('DB connected!');
        startServer();
    })
    .catch((err) => {
        console.log('DB connection error:', err);
    });