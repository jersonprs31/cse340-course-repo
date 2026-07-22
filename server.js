import 'dotenv/config';
import express from 'express';
import { testConnection } from './src/models/db.js';
// Models for organizations and categories have been successfully deleted from here!

// 1. Import your new router
import router from './src/routes.js'; 

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static('public'));

// 2. Tell Express to use your new router for the project routes
app.use('/', router);

// ========================================
// Routes
// ========================================
app.get('/', (req, res) => {
    const pageData = { title: 'Home' };
    res.render('index', pageData);
});

// ========================================
// Error Handling
// ========================================

// 404 Catch-All - Triggers if no routes match the requested URL
app.use((req, res, next) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});

// 500 Global Error Handler - Triggers if a controller throws an error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: '500 - Internal Server Error' });
});

// ========================================
// Start Server
// ========================================
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});