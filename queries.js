
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
        'WHERE department.id = ?';
    return query;
}

const viewAllRoles = function () {
    const query =
        'SELECT role.id, role.title, role.salary, department.dept_name ' +
        'FROM role ' +
        'JOIN department ' +
        'ON department.id = role.department_id';
    return query;
}

const viewAllDepts = function () {
    const query =
        'SELECT id, dept_name ' +
        'FROM department';
    return query;
}

const addDept = function () {
    const query =
        'INSERT INTO department (dept_name) ' +
        'VALUES ' +
        '(?)';
    return query;
}

const addRole = function () {
    const query =

        'INSERT INTO role (department_id, title, salary) ' +
        'VALUES ' +
        '(?, ?, ?)';
    return query;
}

const addEmployee = function () {
    const query =
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) ' +
        'VALUES ' +
        '(?, ?, ?, ?)';
    return query;
}

const updateRole = function () {
    const query =

        'UPDATE employee ' +
        'SET ? ' +
        'WHERE id = ?';
    return query;
}

module.exports = {

    viewAll: viewAll,
    viewAllByDept: viewAllByDept,
    viewAllRoles: viewAllRoles,
    viewAllDepts: viewAllDepts,
    addDept: addDept,
    addRole: addRole,
    addEmployee: addEmployee,
    updateRole: updateRole
};