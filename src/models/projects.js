import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.date, o.name AS org_name, c.category_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        JOIN public.category c ON p.category_id = c.category_id;
    `;
    const result = await db.query(query);
    return result.rows;
};

export { getAllProjects };