
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    const pageData = { title: 'Home' };
    res.render('index', pageData);
});

app.get('/organizations', (req, res) => {
    const pageData = { title: 'Organizations' };
    res.render('organizations', pageData);
});

app.get('/projects', (req, res) => {
    const pageData = { title: 'Service Projects' };
    res.render('projects', pageData);
});

app.get('/categories', (req, res) => {
    const pageData = { title: 'Service Project Categories' };
    res.render('categories', pageData);
});

// Start server using an arrow function
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});