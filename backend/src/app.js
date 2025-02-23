/**
 * Express app configuration
 * Initializes the Express application and registers all routes
*/

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

module.exports = app;