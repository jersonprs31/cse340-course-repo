import db from './db.js'; // Make sure this path points correctly to your database file

const getAllOrganizations = async () => {
    const query = 'SELECT * FROM public.organization ORDER BY name ASC';
    const result = await db.query(query);
    return result.rows;
};

const getOrganizationById = async (id) => {
    const query = 'SELECT * FROM public.organization WHERE organization_id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const getProjectsByOrganization = async (orgId) => {
    const query = `
        SELECT project_id, title, description, date 
        FROM public.project 
        WHERE organization_id = $1 
        ORDER BY date ASC;
    `;
    const result = await db.query(query, [orgId]);
    return result.rows;
};

const createOrganization = async (name, description, contactEmail, logoFilename) => {
    const query = `
      INSERT INTO public.organization (name, description, contact_email, logo_filename)
      VALUES ($1, $2, $3, $4)
      RETURNING organization_id
    `;

    const queryParams = [name, description, contactEmail, logoFilename];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create organization');
    }

    return result.rows[0].organization_id;
};

const updateOrganization = async (id, name, description, contactEmail) => {
    const query = `
        UPDATE public.organization 
        SET name = $1, description = $2, contact_email = $3
        WHERE organization_id = $4 
        RETURNING organization_id;
    `;
    const result = await db.query(query, [name, description, contactEmail, id]);
    
    if (result.rows.length === 0) {
        throw new Error('Failed to update organization');
    }
    
    return result.rows[0].organization_id;
};

export { 
    getAllOrganizations, 
    getOrganizationById, 
    getProjectsByOrganization, 
    createOrganization,
    updateOrganization
};