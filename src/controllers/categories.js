import { getAllCategories, getCategoryDetails, addCategory, updateCategory } from '../models/categories.js';

const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        res.render('categories', { title: 'Service Categories', categories });
    } catch (error) {
        next(error);
    }
};

const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryDetails(categoryId);
        
        if (!category) {
            return res.status(404).render('404', { title: '404 - Category Not Found' });
        }
        
        res.render('category', { title: category.category_name, category });
    } catch (error) {
        next(error);
    }
};

const showNewCategoryForm = (req, res) => {
    res.render('new-category', { 
        title: 'Create New Category', 
        error: null, 
        category_name: '' 
    });
};

const processNewCategoryForm = async (req, res, next) => {
    try {
        const { category_name } = req.body;
        
        // SERVER-SIDE VALIDATION
        if (!category_name || category_name.trim() === '') {
            return res.render('new-category', { title: 'Create New Category', error: 'Category name is required.', category_name });
        }
        if (category_name.length < 3) {
            return res.render('new-category', { title: 'Create New Category', error: 'Category name must be at least 3 characters long.', category_name });
        }
        if (category_name.length > 100) {
            return res.render('new-category', { title: 'Create New Category', error: 'Category name cannot exceed 100 characters.', category_name });
        }

        await addCategory(category_name);
        res.redirect('/categories'); 
    } catch (error) {
        next(error);
    }
};

const showEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryDetails(categoryId);
        
        if (!category) {
            return res.status(404).render('404', { title: '404 - Category Not Found' });
        }
        
        res.render('edit-category', { 
            title: 'Edit Category', 
            error: null, 
            category 
        });
    } catch (error) {
        next(error);
    }
};

const processEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const { category_name } = req.body;
        
        const category = { category_id: categoryId, category_name };

        // SERVER-SIDE VALIDATION
        if (!category_name || category_name.trim() === '') {
            return res.render('edit-category', { title: 'Edit Category', error: 'Category name is required.', category });
        }
        if (category_name.length < 3) {
            return res.render('edit-category', { title: 'Edit Category', error: 'Category name must be at least 3 characters long.', category });
        }
        if (category_name.length > 100) {
            return res.render('edit-category', { title: 'Edit Category', error: 'Category name cannot exceed 100 characters.', category });
        }

        await updateCategory(categoryId, category_name);
        res.redirect(`/category/${categoryId}`); 
    } catch (error) {
        next(error);
    }
};

export { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
};