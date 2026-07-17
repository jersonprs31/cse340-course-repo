import db from './db.js';


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

export { getAllOrganizations, getOrganizationById, getProjectsByOrganization };