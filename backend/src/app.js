/**
 * Express app configuration
 * Initializes the Express application and registers all routes
*/

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;