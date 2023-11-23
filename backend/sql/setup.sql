-- Create the database
CREATE DATABASE shopping_list;

-- Create the user and grant privileges
CREATE USER 'shopping_list_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON shopping_list.* TO 'shopping_list_user'@'localhost';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;