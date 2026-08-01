import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import { testConnection } from './src/models/db.js';
import router from './src/routes.js'; 

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'my_super_secret_key',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.isLoggedIn = false;
    
    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
    }

    res.locals.NODE_ENV = process.env.NODE_ENV;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    next();
});

app.get('/', (req, res) => {
    const pageData = { title: 'Home' };
    res.render('index', pageData);
});

app.use('/', router);

app.use((req, res, next) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: '500 - Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});