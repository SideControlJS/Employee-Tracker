import * as queries from '../db/queries.js';
import { mainMenuPrompt } from './prompts.js';




const init = async () => {
    try {
      const choice = await prompts.mainMenuPrompt();
  
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
          const departmentName = await prompts.addDepartmentPrompt();
          await queries.addDepartment(departmentName);
          break;
        case 'Add an Employee':
          const employeeName = await prompts.addEmployeePrompt();
          await queries.addEmployee(employeeName);
          break;
        case 'Add a Role':
          const roleData = await prompts.addRolePrompt();
          await queries.addRole(roleData);
          break;
        case 'Exit':
          console.log('Goodbye!');
          return;
        default:
          console.log('Invalid choice. Please try again.');
      }
  
      // Recursively call init to show the main menu again
      init();
    } catch (error) {
      console.error('An error occurred:', error);
      process.exit(1);
    }
  };
  
  init();

