INSERT INTO department (department_id),
VALUES
('Engineering'),
('Operations'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Project Engineer', 80000, 001),
('Project Manager', 60000, 002),
('Outside Sales', 100000, 003);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Luke', 'Smith', 1, 1),
('Steve', 'Van', 2, 2),
('Pete', 'Short', 3, 3);
