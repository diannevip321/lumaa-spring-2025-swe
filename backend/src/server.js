/**
 * Server Initialization
 * Starts the Express server and listens for incoming requests
 */

const app = require('./app');
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 
