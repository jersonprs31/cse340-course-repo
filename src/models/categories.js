import db from './db.js';

const getAllCategories = async () => {
    const query = `SELECT category_id, category_name FROM public.category ORDER BY category_name ASC;`;
    const result = await db.query(query);
    return result.rows;
};

const getCategoryDetails = async (id) => {
    const query = `SELECT category_id, category_name FROM public.category WHERE category_id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
};

const addCategory = async (category_name) => {
    const query = `
        INSERT INTO public.category (category_name) 
        VALUES ($1) 
        RETURNING category_id;
    `;
    const result = await db.query(query, [category_name]);
    return result.rows[0].category_id;
};

const updateCategory = async (id, category_name) => {
    const query = `
        UPDATE public.category 
        SET category_name = $1 
        WHERE category_id = $2 
        RETURNING category_id;
    `;
    const result = await db.query(query, [category_name, id]);
    
    if (result.rows.length === 0) {
        throw new Error('Failed to update category. Category may not exist.');
    }
    
    return result.rows[0].category_id;
};

export { 
    getAllCategories, 
    getCategoryDetails, 
    addCategory, 
    updateCategory 
};