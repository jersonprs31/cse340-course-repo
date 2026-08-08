import { getUpcomingProjects, getProjectDetails, addProject, updateProject, getProjectCategories, updateProjectCategories, addVolunteer, removeVolunteer, checkIsVolunteer } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import { getAllCategories } from '../models/categories.js';

const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getUpcomingProjects();
        res.render('projects', { title: 'Service Projects', projects });
    } catch (error) {
        next(error);
    }
};

const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);

        if (!project) {
            return res.status(404).render('404', { title: '404 - Project Not Found' });
        }

        const categories = await getProjectCategories(projectId);
        let isVolunteering = false;
        let user = null;
        
        if (req.session && req.session.user) {
            user = req.session.user;
            isVolunteering = await checkIsVolunteer(projectId, user.user_id);
        }

        res.render('project', { 
            title: project.title, 
            project,
            categories,
            isVolunteering,
            user
        });
    } catch (error) {
        next(error);
    }
};

const showNewProjectForm = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        res.render('new-project', { title: 'Add New Project', organizations });
    } catch (error) {
        next(error);
    }
};

const processNewProjectForm = async (req, res, next) => {
    try {
        const { title, description, date, location, venue, organization_id } = req.body;
        const newProjectId = await addProject(title, description, date, location, venue, organization_id);
        
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        next(error);
    }
};

const showEditProjectForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);
        const organizations = await getAllOrganizations();
        
        if (!project) {
            return res.status(404).render('404', { title: '404 - Project Not Found' });
        }
        
        res.render('edit-project', { 
            title: 'Edit Project', 
            project, 
            organizations 
        });
    } catch (error) {
        next(error);
    }
};

const processEditProjectForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const { title, description, date, location, venue, organization_id } = req.body;
        
        await updateProject(projectId, title, description, date, location, venue, organization_id);
        
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

const showAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);
        const allCategories = await getAllCategories();
        const projectCategories = await getProjectCategories(projectId);
        
        const assignedCategoryIds = projectCategories.map(c => c.category_id);

        res.render('assign-categories', {
            title: 'Assign Categories',
            project,
            allCategories,
            assignedCategoryIds
        });
    } catch (error) {
        next(error);
    }
};

const processAssignCategoriesForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const { categories } = req.body;
        
        await updateProjectCategories(projectId, categories);
        
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

const processVolunteer = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    try {
        await addVolunteer(projectId, userId);
        req.flash('success', 'You are now volunteering for this project!');
    } catch (error) {
        req.flash('error', 'Could not sign up to volunteer.');
    }
    res.redirect(`/project/${projectId}`);
};

const processUnvolunteer = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    try {
        await removeVolunteer(projectId, userId);
        req.flash('success', 'You have been removed as a volunteer.');
    } catch (error) {
        req.flash('error', 'Could not remove volunteer status.');
    }
    
    const referer = req.get('Referrer');
    if (referer && referer.includes('/dashboard')) {
        res.redirect('/dashboard');
    } else {
        res.redirect(`/project/${projectId}`);
    }
};

export { 
    showProjectsPage, 
    showProjectDetailsPage, 
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm, 
    processEditProjectForm,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    processVolunteer,
    processUnvolunteer
};