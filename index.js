let inquirer;
let queries;

const loadModules = async () => {
    inquirer = await import('inquirer');
    queries = await import('./db/queries.js');
};

const init = async () => {
    // Ensure modules are loaded
    if (!inquirer || !queries) {
        await loadModules();
    }

    const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit'
        ]
    });

    switch (choice) {
        case 'View All Departments':
            await queries.viewAllDepartments();
            break;
        case 'View All Roles':
            await queries.viewAllRoles();
            break;
        case 'View All Employees':
            await queries.viewAllEmployees();
            break;
        case 'Add a Department':
            await queries.addDepartment();
            break;
        case 'Add a Role':
            await queries.addRole();
            break;
        case 'Add an Employee':
            await queries.addEmployee();
            break;
        case 'Update an Employee Role':
            await queries.updateEmployeeRole();
            break;
        default:
            process.exit();
    }

    init(); // Re-run the main menu
};

init();

