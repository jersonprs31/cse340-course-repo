import { getAllCategories, getCategoryById, getProjectsByCategory } from '../models/categories.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    res.render('categories', { title: 'Service Categories', categories });
};


const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    

    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategory(categoryId);
    

    res.render('category', { 
        title: category.category_name, 
        category, 
        projects 
    });
};

export { showCategoriesPage, showCategoryDetailsPage };