import express from 'express';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js'; 

import { showOrganizationDetailsPage } from './controllers/organizations.js';

const router = express.Router();


router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);


router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);


router.get('/organization/:id', showOrganizationDetailsPage);

export default router;