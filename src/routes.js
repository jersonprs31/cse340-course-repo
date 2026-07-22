import express from 'express';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js'; 

import { 
    showOrganizationsPage, 
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm 
} from './controllers/organizations.js';

const router = express.Router();

// Project Routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Category Routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Organization Routes
router.get('/organizations', showOrganizationsPage);

// Form Routes (GET shows the form, POST processes the data)
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', processNewOrganizationForm);

// Organization Details Route (Keep this below the /new-organization routes!)
router.get('/organization/:id', showOrganizationDetailsPage);

export default router;