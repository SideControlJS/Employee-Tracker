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
    // Similar structure to the above, but fetching roles
};

const viewAllEmployees = async () => {
    // Similar structure, fetching employees
};

const addDepartment = async (departmentName) => {
    // Use prepared statement to insert a new department
};

const addRole = async (roleData) => {
    // Use prepared statement to insert a new role
};

const addEmployee = async (employeeData) => {
    // Use prepared statement to insert a new employee
};

const updateEmployeeRole = async (employeeId, newRoleId) => {
    // Use prepared statement to update an employee's role
};

// Export functions for use in the main program
export { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };
