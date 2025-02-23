const pool = require("./config/db");

(async () => {
  try {
    const res = await pool.query("SELECT * FROM public.users;");
    console.log("Database Connection Successful! Found users:", res.rows);
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
  }
})();
