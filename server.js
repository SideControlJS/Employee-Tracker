import inquirer from 'inquirer';
import {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  getAllRoles,
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
  // Assume that getDepartments is a function that returns an array of departments
  const departments = await getDepartments(); // You need to implement this in queries.js
  const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));
  const { title, salary, departmentId } = await inquirer.prompt([
    // Add prompts for role title and salary
  ]);
  await addRole({ title, salary, departmentId });
};

const promptAddEmployee = async () => {
  const roles = await getAllRoles(); // Don't forget to implement in queries.js
  const roleChoices = roles.map(role => ({ name: role.title, value: role.id}));
  // Assume getEmployees is a function to get possible managers (or implement a similar logic)
  const managers = await getEmployees(); // Don't forget to implement this in queries.js
  const managerChoices = managers.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id }));

  const  { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the new employee:'

    }
  ])

};

const promptUpdateEmployeeRole = async () => {
  // Similar structure to promptAddRole, but for updating an employee's role
};

// Start the application
mainMenu().catch((err) => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});
