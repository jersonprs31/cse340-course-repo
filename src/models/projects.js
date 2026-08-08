import db from './db.js';

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.date, p.location, p.venue, p.organization_id, o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
    `;
    
    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.date, p.location, p.venue, p.organization_id, o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
    
    const result = await db.query(query, [id]);
    return result.rows[0]; 
};

const addProject = async (title, description, date, location, venue, organization_id) => {
    const query = `
        INSERT INTO public.project (title, description, date, location, venue, organization_id) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING project_id;
    `;
    const result = await db.query(query, [title, description, date, location, venue, organization_id]);
    return result.rows[0].project_id;
};

const updateProject = async (id, title, description, date, location, venue, organization_id) => {
    const query = `
        UPDATE public.project 
        SET title = $1, description = $2, date = $3, location = $4, venue = $5, organization_id = $6
        WHERE project_id = $7
        RETURNING project_id;
    `;
    
    const queryParams = [title, description, date, location, venue, organization_id, id];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to update project. Project may not exist.');
    }

    return result.rows[0].project_id;
};

const getProjectCategories = async (projectId) => {
    const query = `
        SELECT c.category_id, c.category_name 
        FROM public.category c
        JOIN public.project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

const updateProjectCategories = async (projectId, categoryIds) => {
    await db.query(`DELETE FROM public.project_category WHERE project_id = $1`, [projectId]);
    
    if (categoryIds) {
        const ids = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
        
        for (let catId of ids) {
            await db.query(
                `INSERT INTO public.project_category (project_id, category_id) VALUES ($1, $2)`, 
                [projectId, catId]
            );
        }
    }
};

const addVolunteer = async (projectId, userId) => {
    const query = `
        INSERT INTO project_volunteers (project_id, user_id) 
        VALUES ($1, $2) 
        ON CONFLICT DO NOTHING
    `;
    await db.query(query, [projectId, userId]);
};

const removeVolunteer = async (projectId, userId) => {
    const query = `
        DELETE FROM project_volunteers 
        WHERE project_id = $1 AND user_id = $2
    `;
    await db.query(query, [projectId, userId]);
};

const checkIsVolunteer = async (projectId, userId) => {
    const query = `
        SELECT * FROM project_volunteers 
        WHERE project_id = $1 AND user_id = $2
    `;
    const result = await db.query(query, [projectId, userId]);
    return result.rows.length > 0;
};

const getVolunteeredProjectsByUser = async (userId) => {
    const query = `
        SELECT p.project_id, p.title, p.description
        FROM public.project p
        JOIN project_volunteers pv ON p.project_id = pv.project_id
        WHERE pv.user_id = $1
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
};

export { 
    getUpcomingProjects, 
    getProjectDetails,
    addProject, 
    updateProject,
    getProjectCategories,
    updateProjectCategories,
    addVolunteer,
    removeVolunteer,
    checkIsVolunteer,
    getVolunteeredProjectsByUser
};