import { getUpcomingProjects, getProjectDetails, updateProject } from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';

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

        
        let categories = [];
        if (project.category_id && project.category_name) {
            categories.push({
                category_id: project.category_id,
                category_name: project.category_name
            });
        }
        
        res.render('project', { 
            title: project.title, 
            project,
            categories
        });
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
        
        req.flash('success', 'Project updated successfully!');
        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

export { 
    showProjectsPage, 
    showProjectDetailsPage, 
    showEditProjectForm, 
    processEditProjectForm 
};