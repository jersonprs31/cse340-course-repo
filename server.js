import 'dotenv/config';
import express from 'express';
import { testConnection } from './src/models/db.js';

import router from './src/routes.js'; 

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    const pageData = { title: 'Home' };
    res.render('index', pageData);
});

app.use('/', router);


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