# employee-tracker
This is a Node CLI which will give the user options to view, add, update or remove employee, role or department information from a database.

# Table of Contents
* [Instructions](#instructions)
* [Built With](#built-with)
* [Screenshots](#screenshots)
* [Video of app](#video)
* [Sample](#sample)
* [Future Version](#future-version)
* [Author](#author)

## Instructions
<p>Type Node server.js to run the application. You are provided with a list of options you may perform. Select from the list and you may either view the data stored in the database or depending on your option you may see further prompts for information to add or employee id details to update or remove.</p>
<p>The list of actions you can perform are as follows:</p>
<ul>
    <li>View All Employees - All employees are listed along with their details.</li>
    <li>View All Employees by Department - You will be prmoted to enter a department id to list all employee details belonging to that department.</li>
    <li>Add Employee - You will be prompted to enter the employee name, role id & manager id. The new employee will be added to the database.</li>
    <li>Remove Employee - You will be promoted to enter the employee id and it will be removed from the database.</li>
    <li>Update Employee Role - You will be prompted for the employee id and then for the new role id. The employee's role will be updated.</li>
    <li>View Utilized Budget of Department - You will be promoted for the department id and the total slary of all employees in that department will be displayed.</li>
    <li>View All Roles - All roles are listed with their id, title, salary and department name.</li>
    <li>View All Departments - All departments are listed with id and department name.</li>
    <li>Add Department - You will be promoted to enter the new department name and it will be added to the database.</li>
    <li>Add Role - You will be prompted for the role title, salary and department id. It will be added to the database.</li>
</ul>

## Built With

* [VScode] (https://code.visualstudio.com/) 
* [MySQLWOrkbench] (https://www.mysql.com/products/workbench/)

## Screenshots

![Screenshot of CLI prompt showing displayed data](/media/image1.png)

## Video
<p>Find the link to the video demo here: (https://drive.google.com/file/d/1llnN10K5jY0l_ydOrOVzWGfrMjcsiarI/view)</p>

## Sample
<p>Find the link to the database schema here: (https://github.com/bevhatzl/employee-tracker/blob/main/db/emp_trackerDB.sql) </p>
<p>This sample data is here: (https://github.com/bevhatzl/employee-tracker/blob/main/db/seed.sql)</p>

## Future Version
<p>Future versions will fix the bug when adding a new employee as a manager. It should allow to select department. Will also fix the bug which allows you to add manager to a new employee which is a manager. Also will add a list to the update role option instead of asking for the role ID.</p>

## Author
Beverley Hatzl 2020