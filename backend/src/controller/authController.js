/**
 * Authentication Controller
 * Handles user registration and login
 * Uses bcrypt for password hashing and JWT for authentication
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

// Register a new user
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user already exists
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );

        // Generate JWT token immediately after registration
        const token = jwt.sign({ id: newUser.rows[0].id, username: newUser.rows[0].username }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ error: error.message || "Server error: Unable to register user" });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists
      const userResult = await pool.query("SELECT * FROM public.users WHERE username = $1", [username]);
      const user = userResult.rows[0];
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };