// Import the new model functions we just created
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

// Define the constant requested by the instructions
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Update the main projects page to only show the upcoming 5
const showProjectsPage = async (req, res) => {
    // Call the new model function and pass in the constant
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    
    // Update the title as requested
    const title = 'Upcoming Service Projects';
    
    res.render('projects', { title, projects });
};

// Create the new controller for a single project details page
const showProjectDetailsPage = async (req, res) => {
    // Extract the ID from the URL parameter (e.g., /project/3)
    const projectId = req.params.id;
    
    // Fetch the single project using our other new model function
    const project = await getProjectDetails(projectId);
    
    // Pass the project data to a new view named 'project'
    res.render('project', { title: project.title, project });
};

// Export both functions for the router to use
export { showProjectsPage, showProjectDetailsPage };