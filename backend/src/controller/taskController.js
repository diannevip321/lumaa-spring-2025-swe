/**
 * Task Controller
 * Handles task creation, fetching, updating, and deletion.
 */

const pool = require("./config/db");

// Fetch all tasks for the authenticated user
exports.getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await pool.query("SELECT * FROM public.tasks WHERE user_id = $1", [userId]);

        res.status(200).json(tasks.rows);
    } catch (error) {
        res.status(500).json({ error: error.message || "Unable to fetch tasks" });
    }
};

// Create a new task for the authenticated user
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    try{
        const newTask = await pool.query(
            "INSERT INTO public.tasks (title, description, isComplete, userId) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, false, userId]
        )
        res.status(201).json(newTask.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message || "Unable to create task" });
    }
};

// Update a task for the authenticated user
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const userId = req.user.id;
  
    try {
      const updatedTask = await pool.query(
        "UPDATE public.tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 AND userId = $5 RETURNING *",
        [title, description, isComplete, id, userId]
      );
  
      if (updatedTask.rows.length === 0) {
        return res.status(404).json({ message: "Task not found or unauthorized" });
      }
  
      res.json(updatedTask.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  };

  // Delete a task for the authenticated user
  exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const deletedTask = await pool.query(
        "DELETE FROM public.tasks WHERE id = $1 AND userId = $2 RETURNING *",
        [id, userId]
      );
  
      if (deletedTask.rows.length === 0) {
        return res.status(404).json({ message: "Task not found or unauthorized" });
      }
  
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  };