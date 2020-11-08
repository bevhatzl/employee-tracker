// To view all employees
const viewAll = function () {
    const query =
        'SELECT employee.id, employee.first_name, employee.last_name, ' +
        'employee.role_id, employee.manager_id, role.title, department.dept_name, ' +
        'role.salary ' +
        'FROM employee ' +
        'JOIN role ' +
        'ON employee.role_id = role.id ' +
        'JOIN department ' +
        'ON department.id = role.department_id ';
    return query;
}

// To view all employees within a particular department
const viewAllByDept = function () {
    const query =
        'SELECT employee.id, employee.first_name, employee.last_name, ' +
        'employee.role_id, employee.manager_id, role.title, department.dept_name, ' +
        'role.salary ' +
        'FROM employee ' +
        'JOIN role ' +
        'ON employee.role_id = role.id ' +
        'JOIN department ' +
        'ON department.id = role.department_id ' +
        'WHERE department.dept_name = ?';
    return query;
}

// To view all roles
const viewAllRoles = function () {
    const query =
        'SELECT role.id, role.title, role.salary, department.dept_name ' +
        'FROM role ' +
        'JOIN department ' +
        'ON department.id = role.department_id';
    return query;
}

// To view all departments
const viewAllDepts = function () {
    const query =
        'SELECT id, dept_name ' +
        'FROM department';
    return query;
}

// To add a new department
const addDept = function () {
    const query =
        'INSERT INTO department (dept_name) ' +
        'VALUES ' +
        '(?)';
    return query;
}

// To add a new role
const addRole = function () {
    const query =
        'INSERT INTO role (department_id, title, salary) ' +
        'VALUES ' +
        '(?, ?, ?)';
    return query;
}

// To add a new employee
const addEmployee = function () {
    const query =
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) ' +
        'VALUES ' +
        '(?, ?, ?, ?)';
    return query;
}

// To change an employee's role
const updateRole = function () {
    const query =
        'UPDATE employee ' +
        'SET ? ' +
        'WHERE first_name = ? AND last_name = ?';
    return query;
}

// To remove an employee
const removeEmp = function () {
    const query =
        'DELETE FROM employee WHERE employee.first_name = ? ' +
        'AND employee.last_name = ?';
    return query;
}

// To get the total utilized budget of a department
const budgetTotal = function () {
    const query =
        'SELECT SUM(salary) from role ' +
        'WHERE department_id = ?';
    return query;
}

// Exporting to server.js
module.exports = {
    viewAll: viewAll,
    viewAllByDept: viewAllByDept,
    viewAllRoles: viewAllRoles,
    viewAllDepts: viewAllDepts,
    addDept: addDept,
    addRole: addRole,
    addEmployee: addEmployee,
    updateRole: updateRole,
    removeEmp: removeEmp,
    budgetTotal: budgetTotal
};