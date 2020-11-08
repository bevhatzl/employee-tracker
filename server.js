const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
// To hide password and private details
require('dotenv').config();
// Importing from queries.js file
const queries = require("./queries.js");

const roleArray = [];
const employeeArray = [];

// Using variable names for user and password, using the dotenv package
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "emp_trackerDB"
});

// Connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees by Department", "Add Employee", "Remove Employee", "Update Employee Role", "View Utilized Budget of Department", "View All Roles", "View All Departments", "Add Department", "Add Role"]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    // Returns all employee names, id, title, manager id, department name and salary.
                    connection.query(queries.viewAll(), function (err, results) {
                        if (err) throw err;
                        console.log("\n" + "------------------------------------------------------------------------------------------------------");
                        console.table(results);
                        start();
                    });
                    break;
                case "View All Employees by Department":
                    // Takes in a department name and returns employee name, id, title, manager id, department name and salary just for employees in that department.
                    connection.query('SELECT dept_name FROM department', (err, res) => {
                        if (err) throw err;
                        const deptArray = [];
                        for (i = 0; i < res.length; i++) {
                            deptArray.push(res[i].dept_name);

                        }
                        inquirer.prompt({
                            name: "department",
                            type: "list",
                            message: "Please select the department:",
                            choices: deptArray
                        })
                            .then(function (answer) {
                                connection.query(queries.viewAllByDept(), answer.department, function (err, results) {
                                    if (err) throw err;
                                    console.log("\n" + "--------------------------------------------------------------------------------------");
                                    console.table(results);
                                    start();
                                });
                            });
                    });
                    break;
                case "Add Employee":
                    // Takes new employee name, role id and manager id and inserts to the DB.
                    // New Promise to get the list of roles
                    let p = new Promise((resolve, reject) => {
                        connection.query('SELECT DISTINCT title FROM role', function (err, results) {
                            if (err) throw err;
                            if (results) {
                                for (i = 0; i < results.length; i++) {
                                    roleArray.push(results[i].title);
                                }
                                resolve(results)
                            } else {
                                reject('Failed')
                            }
                        });
                    })
                    p.then((promiseResult) => {
                        // New promise to get the list of employees
                        let managerPromise = new Promise((resolve, reject) => {
                            connection.query('SELECT first_name, last_name FROM employee', function (err, results2) {
                                if (err) throw err;
                                if (results2) {
                                    for (i = 0; i < results2.length; i++) {
                                        employeeArray.push(results2[i].first_name + " " + results2[i].last_name);
                                    }
                                    resolve(results2)
                                } else {
                                    reject('Failed')
                                }
                            });
                        })
                        // After the 2 queries retrieved the 2 lists...
                        managerPromise.then((managerPResult) => {
                            inquirer.prompt([
                                {
                                    name: "first_name",
                                    type: "input",
                                    message: "What is the first name of the new employee?"
                                },
                                {
                                    name: "last_name",
                                    type: "input",
                                    message: "What is the last name of the new employee?"
                                },
                                {
                                    name: "role_id",
                                    type: "list",
                                    message: "What is the role of the new employee?",
                                    choices: roleArray
                                },
                                {
                                    name: "manager_id",
                                    type: "list",
                                    message: "What is the manager of the new employee?",
                                    choices: employeeArray
                                }]
                            )
                                .then(function (answer) {
                                    const splitManName = answer.manager_id.split(" ");
                                    const manFirstN = splitManName[0];
                                    const manLastN = splitManName[1];
                                    connection.query(queries.addEmployee(), [answer.first_name, answer.last_name, answer.role_id, manFirstN, manLastN], function (err, results) {
                                        if (err) throw err;
                                        console.log("\n" + "-------------------------------------------------");
                                        console.log(`New Employee added: ${answer.first_name} ${answer.last_name} \n`);
                                        start();
                                    });
                                });
                        }).catch((managerPResult) => {
                            console.log(managerPResult)
                        })
                    }).catch((promiseResult) => {
                        console.log(promiseResult);
                    })
                    break;
                case "Remove Employee":
                    // Takes in employee and deletes the employee from the DB. The first query gets the list of employees to display.
                    connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
                        if (err) throw err;
                        const empChoices = [];
                        for (i = 0; i < res.length; i++) {
                            empChoices.push(res[i].first_name + " " + res[i].last_name);
                        }
                        inquirer.prompt({
                            name: "emp_id",
                            type: "list",
                            message: "Please select the employee to remove:",
                            choices: empChoices
                        })
                            .then(function (answer) {
                                const splitName = answer.emp_id.split(" ");
                                const firstN = splitName[0];
                                const lastN = splitName[1];
                                connection.query(queries.removeEmp(), [firstN, lastN], function (err, results) {
                                    if (err) throw err;
                                    console.log(`Employee has been removed.`);
                                    start();
                                });
                            });
                    })
                    break;
                case "Update Employee Role":
                    // Takes in employee and the new role for the employee and updates the role.
                    connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
                        if (err) throw err;
                        const empChoices = [];
                        for (i = 0; i < res.length; i++) {
                            empChoices.push(res[i].first_name + " " + res[i].last_name);
                        }
                        inquirer.prompt([
                            {
                                name: "emp_id",
                                type: "list",
                                message: "What is the employee to update?",
                                choices: empChoices
                            },
                            {
                                name: "new_role_id",
                                type: "input",
                                message: "What is the id of the new role?"
                            }]
                        )
                            .then(function (answer) {
                                const splitName = answer.emp_id.split(" ");
                                const firstN = splitName[0];
                                const lastN = splitName[1];
                                connection.query(queries.updateRole(), [{ role_id: answer.new_role_id }, firstN, lastN], function (err, results) {
                                    if (err) throw err;
                                    console.log("\n" + "-------------------------------------------------");
                                    console.log(`The employee's role has been updated. \n`);
                                    start();
                                });
                            });
                    });
                    break;
                case "View Utilized Budget of Department":
                    // Takes in department id and sums the salaries of all employees in that department.
                    inquirer.prompt(
                        {
                            name: "dept_id",
                            type: "input",
                            message: "Enter the department id:"
                        }
                    )
                        .then(function (answer) {
                            connection.query(queries.budgetTotal(), answer.dept_id, function (err, results) {
                                if (err) throw err;
                                console.log("\n" + "-------------------------------------------------");
                                // To convert from the object to a string
                                const result = JSON.stringify(results[0]["SUM(salary)"]);
                                console.log(`The total utilized budget of that department is: $${result}`);
                                start();
                            });
                        });
                    break;
                case "View All Roles":
                    // Returns role id, title, salary and department name for all roles.
                    connection.query(queries.viewAllRoles(), function (err, results) {
                        if (err) throw err;
                        console.log("\n" + "-------------------------------------------------");
                        console.table(results);
                        start();
                    });
                    break;
                case "View All Departments":
                    // Returns id and department name for all departments.
                    connection.query(queries.viewAllDepts(), function (err, results) {
                        if (err) throw err;
                        console.log("\n" + "-------------------------------------------------");
                        console.table(results);
                        start();
                    });
                    break;
                case "Add Department":
                    // Takes in the new department name and inserts into the DB.
                    inquirer.prompt(
                        {
                            name: "dept_name",
                            type: "input",
                            message: "What is the name of the new department?"
                        }
                    )
                        .then(function (answer) {
                            connection.query(queries.addDept(), answer.dept_name, function (err, results) {
                                if (err) throw err;
                                console.log("\n" + "-------------------------------------------------");
                                console.log(`New department added: ${answer.dept_name} \n`);
                                start();
                            });

                        });
                    break;
                case "Add Role":
                    // Takes in a new role's title, salary and department and inserts into the DB.
                    inquirer.prompt([
                        {
                            name: "title",
                            type: "input",
                            message: "What is the title of the new role?"
                        },
                        {
                            name: "salary",
                            type: "input",
                            message: "What is the salary of the new role?"
                        },
                        {
                            name: "department",
                            type: "input",
                            message: "What is the department id of the new role?"
                        }
                    ])
                        .then(function (answer) {
                            connection.query(queries.addRole(), [answer.department, answer.title, answer.salary], function (err, results) {
                                if (err) throw err;
                                console.log("\n" + "-------------------------------------------------");
                                console.log(`New Role added: ${answer.title} \n`);
                                start();
                            });
                        });
                    break;
                default:
                    connection.end();
            }
        });
}

