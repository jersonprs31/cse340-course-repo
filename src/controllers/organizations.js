import { getOrganizationById, getProjectsByOrganization } from '../models/organizations.js';

const showOrganizationDetailsPage = async (req, res) => {
    const orgId = req.params.id;
    
   
    const organization = await getOrganizationById(orgId);
    const projects = await getProjectsByOrganization(orgId);
    
    res.render('organization', { 
        title: organization.name, 
        organization, 
        projects 
    });
};

export { showOrganizationDetailsPage };