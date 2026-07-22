import { getOrganizationById, getProjectsByOrganization, getAllOrganizations } from '../models/organizations.js';

const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';
        res.render('organizations', { title, organizations });
    } catch (error) {
        next(error); // Passes errors to the 500 handler in server.js
    }
};

const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const orgId = req.params.id;
        
        const organization = await getOrganizationById(orgId);
        const projects = await getProjectsByOrganization(orgId);
        
        // Triggers the 404 handler if the organization doesn't exist
        if (!organization) {
            return res.status(404).render('404', { title: '404 - Organization Not Found' });
        }
        
        res.render('organization', { 
            title: organization.name, 
            organization, 
            projects 
        });
    } catch (error) {
        next(error);
    }
};

// Export both functions
export { showOrganizationsPage, showOrganizationDetailsPage };