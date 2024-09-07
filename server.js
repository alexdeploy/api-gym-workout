require('dotenv').config();
const database = require('./modules/mongodb');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const routes = require('./routes/routes');

const app = express();

const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable api logging
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});