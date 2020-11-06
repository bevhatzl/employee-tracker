
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
        'WHERE department.dept_name = ?';
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

module.exports = {

    viewAll: viewAll,
    viewAllByDept: viewAllByDept,
    viewAllRoles: viewAllRoles,
    viewAllDepts: viewAllDepts
};