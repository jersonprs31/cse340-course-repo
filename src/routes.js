import express from 'express';

// 1. Project Controllers
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

// 2. Category Controllers
import { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
} from './controllers/categories.js'; 

// 3. Organization Controllers
import { 
    showOrganizationsPage, 
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,     
    processEditOrganizationForm   
} from './controllers/organizations.js';

const router = express.Router();

// --- PROJECT ROUTES ---
router.get('/projects', showProjectsPage);
router.get('/new-project', showNewProjectForm);     
router.post('/new-project', processNewProjectForm); 
router.get('/project/:id', showProjectDetailsPage);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', processEditProjectForm);
router.get('/project/:id/assign-categories', showAssignCategoriesForm);
router.post('/project/:id/assign-categories', processAssignCategoriesForm);

// --- CATEGORY ROUTES ---
router.get('/categories', showCategoriesPage);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', processEditCategoryForm);
router.get('/category/:id', showCategoryDetailsPage);

// --- ORGANIZATION ROUTES ---
router.get('/organizations', showOrganizationsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);   // Added
router.post('/edit-organization/:id', processEditOrganizationForm); // Added
router.get('/organization/:id', showOrganizationDetailsPage);

export default router;