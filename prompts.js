import inquirer from 'inquirer';

export const addDepartmentPrompt = async () => {
    return inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the new department:',
        validate: input => input ? true : 'Department name cannot be empty'
    });
};

export const addRolePrompt = async () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:',
            validate: input => input ? true : 'Role title cannot be empty'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the new role:',
            validate: input => !isNaN(input) ? true : 'Please enter a valid number'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department ID for the new role:',
            validate: input => !isNaN(input) ? true : 'Please enter a valid department ID'
        }
    ]);
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