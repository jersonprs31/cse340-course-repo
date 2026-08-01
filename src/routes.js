import express from 'express';

import { 
    showProjectsPage, 
    showProjectDetailsPage,
    showNewProjectForm,          
    processNewProjectForm,        
    showEditProjectForm,
    processEditProjectForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/projects.js';

import { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
} from './controllers/categories.js'; 

import { 
    showOrganizationsPage, 
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,     
    processEditOrganizationForm   
} from './controllers/organizations.js';

// Consolidate all user imports into this single block
import { 
    showUserRegistrationForm, 
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout
} from './controllers/users.js';

const router = express.Router();

router.get('/projects', showProjectsPage);
router.get('/new-project', showNewProjectForm);     
router.post('/new-project', processNewProjectForm); 
router.get('/project/:id', showProjectDetailsPage);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);
router.get('/project/:id/assign-categories', showAssignCategoriesForm);
router.post('/project/:id/assign-categories', processAssignCategoriesForm);

router.get('/categories', showCategoriesPage);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', processEditCategoryForm);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/organizations', showOrganizationsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);   
router.post('/edit-organization/:id', processEditOrganizationForm); 
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

export default router;