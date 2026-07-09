-- Drop tables if they exist
DROP TABLE IF EXISTS project CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS organization CASCADE;

-- 1. Create Organization Table
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- 2. Create Category Table
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(150) NOT NULL
);

-- 3. Create Project Table
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    organization_id INT REFERENCES organization(organization_id),
    category_id INT REFERENCES category(category_id)
);

-- Insert Data into Organization Table
INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
('Bright Future', 'Dedicated to educating the youth and building a better tomorrow.', 'contact@brightfuture.org', 'brightfuture-logo.png'),
('Green Harvest', 'Promoting environmental sustainability and local community gardens.', 'info@greenharvest.org', 'greenharvest-logo.png'),
('Unity Serve', 'Bringing communities together through volunteer service and outreach.', 'hello@unityserve.org', 'unityserve-logo.png');

-- Insert Data into Category Table
INSERT INTO category (category_name) VALUES
('Education'),
('Environmental Cleanup'),
('Community Outreach');

-- Insert Data into Project Table
INSERT INTO project (title, description, date, organization_id, category_id) VALUES
('Youth Tutoring Drive', 'Help tutor local high school students in math and science.', '2026-08-15', 1, 1),
('Downtown Park Cleanup', 'Join us to clean up the downtown park and plant new trees.', '2026-08-22', 2, 2),
('Food Bank Distribution', 'Volunteer to pack and distribute meals to families in need.', '2026-08-29', 3, 3);