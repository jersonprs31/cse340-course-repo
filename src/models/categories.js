import db from './db.js';


const getAllCategories = async () => {
    const query = 'SELECT * FROM public.category ORDER BY category_name ASC';
    const result = await db.query(query);
    return result.rows;
};


const getCategoryById = async (id) => {
    const query = 'SELECT * FROM public.category WHERE category_id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
};


const getProjectsByCategory = async (categoryId) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.date, p.organization_id, o.name AS organization_name
        FROM public.project p
        JOIN public.organization o ON p.organization_id = o.organization_id
        WHERE p.category_id = $1
        ORDER BY p.date ASC;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
};


const getCategoriesByProject = async (projectId) => {
    const query = `
        SELECT c.category_id, c.category_name
        FROM public.category c
        JOIN public.project p ON c.category_id = p.category_id
        WHERE p.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

export { 
    getAllCategories, 
    getCategoryById, 
    getProjectsByCategory, 
    getCategoriesByProject 
};