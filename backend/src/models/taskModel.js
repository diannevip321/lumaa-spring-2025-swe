/**
 * Task Model
 * Defines the database structure for tasks.
 */

exports.Task = {
    id: Number,
    title: String,
    description: String,
    isComplete: Boolean,
    userId: Number
};