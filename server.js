const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
// To hide password and private details
require('dotenv').config();

const queries = require("./queries.js");

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
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "View All Departments", "Add Department", "Add Role"]
        })
        .then(function (answer) {

            switch (answer.action) {
                case "View All Employees":
                    connection.query(queries.viewAll(), function (err, results) {
                        if (err) throw err;
                        console.log("\n" + "------------------------------------------------------------------------------------------------------");
                        console.table(results);
                        start();
                    });

                    break;

                case "View All Employees by Department":
                    inquirer.prompt({
                        name: "department",
                        type: "input",
                        message: "Please enter the department id:"
                    })
                        .then(function (answer) {
                            connection.query(queries.viewAllByDept(), answer.department, function (err, results) {
                                if (err) throw err;
                                console.log("\n" + "--------------------------------------------------------------------------------------");
                                console.table(results);
                                start();
                            });

                        });
                    break;
                case "View All Employees by Manager":
                    break;
                case "Add Employee":
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
                            type: "input",
                            message: "What is the role id of the new employee?"
                        },
                        {
                            name: "manager_id",
                            type: "input",
                            message: "What is the manager id of the new employee?"
                        }]
                    )
                        .then(function (answer) {
                            connection.query(queries.addEmployee(), [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function (err, results) {
                                if (err) throw err;
                                console.log("\n" + "-------------------------------------------------");
                                console.log(`New Employee added: ${answer.first_name} ${answer.last_name} \n`);
                                start();
                            });

                        });
                    break;

                case "Remove Employee":
                    break;
                case "Update Employee Role":
                    break;
                case "Update Employee Manager":
                    break;
                case "View All Roles":
                    connection.query(queries.viewAllRoles(), function (err, results) {
                        if (err) throw err;
                        console.log("\n" + "-------------------------------------------------");
                        console.table(results);
                        start();
                    });
                    break;
                case "View All Departments":
                    connection.query(queries.viewAllDepts(), function (err, results) {
                        if (err) throw err;
                        console.log("\n" + "-------------------------------------------------");
                        console.table(results);
                        start();
                    });
                    break;
                case "Add Department":
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

