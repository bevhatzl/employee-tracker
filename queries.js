
const viewAll = function () {
    return "SELECT * FROM employee";
}

const viewAllByDept = function () {
    const query =
        'SELECT employee.id, employee.first_name, employee.last_name, ' +
        'employee.role_id, employee.manager_id ' +
        'FROM employee ' +
        'JOIN role ' +
        'ON employee.role_id = role.id ' +
        'JOIN department ' +
        'ON department.id = role.department_id ' +
        'WHERE department.name = ?';
    console.log(query);
    return (query);
}



module.exports = {

    viewAll: viewAll,
    viewAllByDept: viewAllByDept
};