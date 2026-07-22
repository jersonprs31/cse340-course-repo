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

export { getUpcomingProjects, getProjectDetails, updateProject };