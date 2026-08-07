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

import { 
    showUserRegistrationForm, 
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    showUserList
} from './controllers/users.js';

const router = express.Router();

router.get('/projects', showProjectsPage);
router.get('/new-project', requireLogin, requireRole('admin'), showNewProjectForm);     
router.post('/new-project', requireLogin, requireRole('admin'), processNewProjectForm); 
router.get('/project/:id', showProjectDetailsPage);
router.get('/edit-project/:id', requireLogin, requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireLogin, requireRole('admin'), processEditProjectForm);
router.get('/project/:id/assign-categories', requireLogin, requireRole('admin'), showAssignCategoriesForm);
router.post('/project/:id/assign-categories', requireLogin, requireRole('admin'), processAssignCategoriesForm);

router.get('/categories', showCategoriesPage);
router.get('/new-category', requireLogin, requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireLogin, requireRole('admin'), processNewCategoryForm);
router.get('/edit-category/:id', requireLogin, requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireLogin, requireRole('admin'), processEditCategoryForm);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/organizations', showOrganizationsPage);
router.get('/new-organization', requireLogin, requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireLogin, requireRole('admin'), processNewOrganizationForm);
router.get('/edit-organization/:id', requireLogin, requireRole('admin'), showEditOrganizationForm);   
router.post('/edit-organization/:id', requireLogin, requireRole('admin'), processEditOrganizationForm); 
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireLogin, requireRole('admin'), showUserList);

export default router;