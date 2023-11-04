import inquirer from 'inquirer';
import { getAllDepartments, getAllRoles,  } from './db/queries';

export const mainMenuPrompt = async () => {
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
    return choice;
  };

export const addDepartmentPrompt = async () => {
    const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
        validate: input => input ? true : 'Department name cannot be empty!'
    });
    return departmentName;
};


export const addRolePrompt = async () => {
    const departments = await getAllDepartments();
    const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

    const { title, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role',
            validate: input => input ? true : 'Role title cannot be empty'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the title of the role',
            validate: input => !isNaN(input) && input > 0 ? true : 'Please enter a valid salary!'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Choose the department for the role:',
            choices: departmentChoices
        }
    ]);
    return { title, salary, departmentId };
};

export const addEmployeePrompt = async () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the new employee:',
            validate: input => input ? true : 'First name cannot be empty'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the new employee:',
            validate: input => input ? true : 'Last name cannot be empty'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID for the new employee:',
            validate: input => !isNaN(input) ? true : 'Please enter a valid role ID'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID for the new employee (or leave blank if none):',
            validate: input => input === '' || !isNaN(input) ? true : 'Please enter a valid manager ID or leave blank'
        }
    ]);
};

export const updateEmployeeRolePrompt = async () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee you wish to update:',
            validate: input => !isNaN(input) ? true : 'Please enter a valid employee ID'
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID for the employee:',
            validate: input => !isNaN(input) ? true : 'Please enter a valid role ID'
        }
    ]);
};
