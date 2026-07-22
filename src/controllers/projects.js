import { getProjectDetails, updateProject } from '../models/projects.js';
// NEW IMPORT: Bring in the organizations model to populate the dropdown
import { getAllOrganizations } from '../models/organizations.js';


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