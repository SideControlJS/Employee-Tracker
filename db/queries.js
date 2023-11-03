import mysql from 'mysql2/promise';

// Set up a connection pool, adjust credentials as necessary
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'JL_SQL',
    database: 'employee_tracker' 
});

const getAllDepartments = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM department');
        return rows; 
    } catch (error) {
        console.error('Error fetching department:', error.message);
    }
    return [];
};

const getAllRoles = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM role');
        return rows;
    } catch (error) {
        console.error('Error fetching role:', error.message);
    }
    return [];
};


const viewAllDepartments = async () => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM department');
        console.table(rows);  // Display the results in a table format
    } catch (error) {
        console.error('Error fetching department:', error.message);
    }
};

const viewAllRoles = async () => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM  role');
        console.table(rows); //display the results in a table format
    } catch (error) {
        console.error('Error fetching roles:', error.message);
    }
};

const viewAllEmployees = async () => {
    try {
        const sql = `
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
            FROM employees 
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees manager ON employees.manager_id = manager.id;
        `;
        const [rows] = await pool.query(sql);
        console.table(rows);
    } catch (error) {
        console.error('Error fetching employees:', error.message);
    }
};

const addDepartment = async (departmentName) => {
    try {
        const sql = 'INSERT INTO department (name) VALUES (?)';
        await pool.query(sql, [departmentName]);
        console.log('Department added successfully.');
    } catch (error) {
        console.error('Error adding department:', error.message);
    }
};

const addRole = async (roleData) => {
    try {
        const { title, salary, departmentId } = roleData;
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        await pool.query(sql, [title, salary, departmentId]);
        console.log('Role added successfully');
    } catch (error) {
        console.error('Error adding role:', error.message);
    }
};

const addEmployee = async (employeeData) => {
    try {
        const { firstName, lastName, roleId, managerId } = employeeData;
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        await pool.query(sql, [firstName, lastName, roleId, managerId]);
        console.log('Employee added successfully.');
    } catch (error) {
        console.error('Error adding employee:', error.message);
    }
};


const updateEmployeeRole = async (employeeId, newRoleId) => {
    try {
        const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
        await pool.query(sql, [newRoleId, employeeId]);
        console.log('Employee role updated successfully.');
    } catch (error) {
        console.error('Error updating employee role:', error.message);
    }
};


// Export functions for use in the main program
export { getAllDepartments, getAllRoles, viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };
