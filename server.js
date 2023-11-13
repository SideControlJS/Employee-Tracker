import inquirer from 'inquirer';
import {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  
  // Import other necessary functions from queries.js
} from './db/queries.js';

const mainMenu = async () => {
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
      await viewAllDepartments();
      break;
    case 'View All Roles':
      await viewAllRoles();
      break;
    case 'View All Employees':
      await viewAllEmployees();
      break;
    case 'Add a Department':
      await promptAddDepartment();
      break;
    case 'Add a Role':
      await promptAddRole();
      break;
    case 'Add an Employee':
      await promptAddEmployee();
      break;
    case 'Update an Employee Role':
      await promptUpdateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }
  return mainMenu(); // Return to main menu after action is completed
};

const promptAddDepartment = async () => {
  const { departmentName } = await inquirer.prompt({
    type: 'input',
    name: 'departmentName',
    message: 'Enter the name of the new department:'
  });
  await addDepartment(departmentName);
};

const promptAddRole = async () => {
  // Fetch all departments for the user to choose which department the role belongs to
  const departments = await getAllDepartments(); 
  const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

  // Ask the user for the new role information
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?',
      validate: input => input ? true : 'This field is required.'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for the new role?',
      validate: input => {
        const parsed = parseFloat(input);
        return (!isNaN(parsed) && parsed > 0) ? true : 'Please enter a valid salary.';
      }
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department does the role belong to?',
      choices: departmentChoices
    }
  ]);

  // Use the answers to add the new role to the database
  await addRole({
    title: answers.title,
    salary: answers.salary,
    departmentId: answers.departmentId
  });

  console.log(`Added new role: ${answers.title}`);
};

const promptAddEmployee = async () => {
  // Prompt for the new employee's details
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the new employee:',
      validate: input => input ? true : 'First name cannot be empty.'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the new employee:',
      validate: input => input ? true : 'Last name cannot be empty.'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the role ID for the new employee:',
      validate: input => {
        const parsed = parseInt(input, 10);
        return !isNaN(parsed) && parsed > 0 ? true : 'Please enter a valid role ID.';
      }
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager ID for the new employee (leave blank if no manager):',
      default: null, // Default to null if no input is provided
      validate: input => {
        if (input === '') return true;
        const parsed = parseInt(input, 10);
        return !isNaN(parsed) && parsed > 0 ? true : 'Please enter a valid manager ID or leave blank.';
      },
      filter: input => {
        // Convert to null if the input is an empty string, otherwise convert to number
        return input === '' ? null : parseInt(input, 10);
      }
    }
  ]);

  // Add the employee to the database
  await addEmployee({ firstName, lastName, roleId, managerId });
  console.log(`Added new employee: ${firstName} ${lastName}`);
};


const promptUpdateEmployeeRole = async () => {
  const employee = await getAllEmployees(); 
  const employeeChoices = employee.map(emp => ({ name: emp.first_name + " " + emp.last_name, value: emp.id }));
  const roles = await getAllRoles(); 
  const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

  const { employeeId, newRoleId } = await inquirer.prompt([
    {
      type: "list",
      name: 'employeeId',
      message: 'Select the employee whose role you want to update',
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'newRoleId',
      message: 'Select the role for the employee',
      choices: roleChoices
    }
  ]);

  await updateEmployeeRole(employeeId, newRoleId);
};

// Start the application
mainMenu().catch((err) => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});
