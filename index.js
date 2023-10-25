import inquirer from 'inquirer';
import * as queries from './db/queries.js';
import { addEmployeePrompt } from './prompts.js';

const promptAddDepartment = async () => {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:',
        validate: name => name ? true: 'Department name cannot be empty!'
    });
    return name;
}

const promptAddRole = async () => {
    const departments = await queries.getAllDepartments();
    const departmentChoices = departments.map(dept => ({
        name: dept.name,
        value: dept.id  
    }));
    
    const responses = await inquirer.promt([
        {
            type: 'input', 
            name: 'title',
            message: 'Enter the title of the role:',
            validate: title => title ? true : 'Title cannot be empty!'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role:',
            validate: salary => {
                const valid = !isNaN(parseFloat(salary)) && isFinite(salary);
                return valid || 'Please enter a number';
            }
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department for the role:',
            choices: departmentChoices
        }
    ]);

    return {
        title: responses.title,
        salary: parseFloat(responses.salary), // converts salary to number
        departmentId: responses.departmentId
    };
};



const init = async () => {

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
            const departmentName = await promptAddDepartment();
            await queries.addDepartment(departmentName);
            break;
        case 'Add a Role':
            const roleData = await promptAddRole();
            await queries.addRole(roleData);
            break;
        case 'Add an Employee':
            const employeeData = await addEmployeePrompt();
            await queries.addEmployee(employeeData);
            break;
        case 'Update an Employee Role':
            const { employeeId, newRoleId } = await updateEmployeeRolePrompt();
            await queries.updateEmployeeRole(employeeId, newRoleId);
            break;
        default:
            process.exit();
    }

    init(); // Re-run the main menu
};

init();

