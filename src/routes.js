import express from 'express';

import { 
    showProjectsPage, 
    showProjectDetailsPage,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';


import { 
    showCategoriesPage, 
    showCategoryDetailsPage 
} from './controllers/categories.js'; 


import { 
    showOrganizationsPage, 
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm 
} from './controllers/organizations.js';

const router = express.Router();

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// NEW: Edit Project Routes
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/organizations', showOrganizationsPage);

router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', processNewOrganizationForm);
router.get('/organization/:id', showOrganizationDetailsPage);

export default router;