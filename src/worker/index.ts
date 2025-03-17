import express from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Ensure package.json has "type": "module" to use ES module syntax
