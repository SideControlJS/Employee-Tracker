import mysql from 'mysql2/promise';

// Set up a connection pool, adjust credentials as necessary
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'JL_SQL',
    database: 'employee_tracker' 
});

const viewAllDepartments = async () => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM departments');
        console.table(rows);  // Display the results in a table format
    } catch (error) {
        console.error('Error fetching departments:', error.message);
    }
};

const viewAllRoles = async () => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM  roles');
        console.table(rows); //display the results in a table format
    } catch (error) {
        console.error('Error fetching roles:', error.message);
    }
};

const viewAllEmployees = async () => {
    // Similar structure, fetching employees
};

const addDepartment = async (departmentName) => {
    // Use prepared statement to insert a new department
};

const addRole = async (roleData) => {
    try {
        const { title, salary, departmentId } = roleData;
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        await pool.query(sql, [title, salary, departmentId]);
        console.log('Role added successfully');
    } catch (error) {
        console.error('Error adding role:', error.message);
    }
};

const addEmployee = async (employeeData) => {
    // Use prepared statement to insert a new employee
};

const updateEmployeeRole = async (employeeId, newRoleId) => {
    // Use prepared statement to update an employee's role
};

// Export functions for use in the main program
export { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };
