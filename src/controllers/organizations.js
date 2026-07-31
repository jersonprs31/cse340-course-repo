import { 
    getOrganizationById, 
    getProjectsByOrganization, 
    getAllOrganizations, 
    createOrganization,
    updateOrganization
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
        res.render('new-organization', { title, error: null });
    } catch (error) {
        next(error);
    }
};

const processNewOrganizationForm = async (req, res, next) => {
    try {
        const { name, description, contactEmail } = req.body;
        const logoFilename = 'placeholder-logo.png'; 

        // Server-side validation
        if (!name || !description || !contactEmail) {
            return res.render('new-organization', { title: 'Add New Organization', error: 'All fields are required.' });
        }

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

const showEditOrganizationForm = async (req, res, next) => {
    try {
        const orgId = req.params.id;
        const organization = await getOrganizationById(orgId); 
        
        if (!organization) {
            return res.status(404).render('404', { title: '404 - Organization Not Found' });
        }

        res.render('edit-organization', { title: 'Edit Organization', organization, error: null });
    } catch (error) {
        next(error);
    }
};

const processEditOrganizationForm = async (req, res, next) => {
    try {
        const orgId = req.params.id;
        const { name, description, contactEmail } = req.body;
        
        // Server-side validation 
        if (!name || !description || !contactEmail) {
            const organization = { organization_id: orgId, name, description, contact_email: contactEmail };
            return res.render('edit-organization', { title: 'Edit Organization', organization, error: 'All fields are required.' });
        }

        await updateOrganization(orgId, name, description, contactEmail);
        res.redirect(`/organization/${orgId}`);
    } catch (error) {
        next(error);
    }
};

export { 
    showOrganizationsPage, 
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm
};