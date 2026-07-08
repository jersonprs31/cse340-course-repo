import 'dotenv/config';
import express from 'express';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllCategories } from './src/models/categories.js';
import { getAllProjects } from './src/models/projects.js';

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static('public'));

// ========================================
// Routes
// ========================================
app.get('/', (req, res) => {
    const pageData = { title: 'Home' };
    res.render('index', pageData);
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
});

app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    res.render('categories', { title, categories });
});

app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Available Service Projects';
    res.render('projects', { title, projects });
});

// ========================================
// Start Server
// ========================================
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});