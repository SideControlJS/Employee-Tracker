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
  const departments = await getAllDepartments(); 
  const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));
  const { title, salary, departmentId } = await inquirer.prompt([
    // Add prompts for role title and salary
  ]);
  await addRole({ title, salary, departmentId });
};

const promptAddEmployee = async () => {
  const roles = await getAllRoles(); 
  const roleChoices = roles.map(role => ({ name: role.title, value: role.id}));

  // option for creating a new role
  roleChoices.push({ name: 'Create New Role', value: -1 });

  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role for the new employee:',
      choices: roleChoices
    }
  ]);

  //if the user chooses to create a new role, prompt them for the new role details
  if (roleId === -1) {
    const departments = await getAllDepartments();
    const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));
    const { title, salary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role',
        validate: input => input ? true : 'Please enter a title.'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role',
        validate: input => !isNaN(parseFloat(input)) ? true : 'Please enter a valid salary.'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for the new role: ',
        choices: departmentChoices
      }
    ]);

    // create the new role and return its ID
    const newRole = await addRole({ title, salary, departmentId });
    return newRole.id;
  }

  return roleId;

};  

  const managers = await getAllEmployees(); 
  const managerChoices = managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }));

  const  { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the new employee:'
        //validation
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the new employee:'
      //validation
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role for the new employee',
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select the role for the new employee',
      choices: managerChoices,
      when: managers.length > 0 // only show this prompt if there are managers to choose from
    }
  ]);

  await addEmployee({ firstName, lastName, roleId, managerId });


const promptUpdateEmployeeRole = async () => {
  const employee = await getEmployees(); // implement this in queries.js
  const employeeChoices = employee.map(emp => ({ name: emp.first_name + " " + emp.last_name, value: emp.id }));
  const roles = await getAllRoles(); // implement this in queries.js
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
