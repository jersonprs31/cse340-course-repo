import { 
    getOrganizationById, 
    getProjectsByOrganization, 
    getAllOrganizations, 
    createOrganization 
} from '../models/organizations.js';

const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';
        res.render('organizations', { title, organizations });
    } catch (error) {
        next(error); 
    }
};

const showNewOrganizationForm = async (req, res, next) => {
    try {
        const title = 'Add New Organization';
        res.render('new-organization', { title });
    } catch (error) {
        next(error);
    }
};

const processNewOrganizationForm = async (req, res, next) => {
    try {
        const { name, description, contactEmail } = req.body;
        const logoFilename = 'placeholder-logo.png'; 

        const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
        
        
        res.redirect(`/organization/${organizationId}`);
    } catch (error) {
        next(error); 
    }
};

const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const orgId = req.params.id;
        
        const organization = await getOrganizationById(orgId);
        const projects = await getProjectsByOrganization(orgId);
        
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

export { 
    showOrganizationsPage, 
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm
};