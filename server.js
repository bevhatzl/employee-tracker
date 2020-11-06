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
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "View All Departments", "Add Department"]
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
                        type: "list",
                        message: "Which department?",
                        choices: ["Human Resources", "IT", "Finance", "Product Support"]
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
                                console.log(`New department added: ${answer.dept_name}`);
                                start();
                            });

                        });
                    break;
                default:
                    connection.end();
            }


        });
}

