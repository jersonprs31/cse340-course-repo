import db from './db.js';

// 1. Get the next upcoming projects (filtered and limited)
const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.date, p.organization_id, o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
    `;
    
    // We pass number_of_projects as an array to replace the $1 placeholder
    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

// 2. Get the details for a single specific project
const getProjectDetails = async (id) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.date, p.organization_id, o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;
    
    // We pass id as an array to replace the $1 placeholder
    const result = await db.query(query, [id]);
    
    // Since I only want ONE project, we return the first item in the rows array
    return result.rows[0]; 
};

// Export the new functions so your controllers can use them
export { getUpcomingProjects, getProjectDetails };