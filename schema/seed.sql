INSERT INTO department (id, name)
VALUES 
    (1, "Human Resources"),
    (2, "IT"),
    (3, "Finance"),
    (4, "Product Support");

INSERT INTO role (id, title, salary, department_id)
VALUES 
    (1, "Manager", 85000.00, 1),
    (2, "Recruiter", 70000.00, 1),
    (3, "Manager", 150000.00, 2),
    (4, "Senior Developer", 105000.00, 2),
    (5, "Junior Developer", 85000.00, 2),
    (6, "Manager", 110000.00, 3),
    (7, "Accountant", 90000.00, 3),
    (8, "Manager", 85000.00, 4),
    (9, "Support Officer", 65000.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (1, "Bob", "Willis", 1, NULL),
    (2, "Jenny", "McArthy", 2, 1),
    (3, "Phil", "James", 3, NULL),
    (4, "Vincent", "Nguyen", 4, 3),
    (5, "Mary", "Bishop", 5, 3),
    (6, "David", "Lukas", 6, NULL),
    (7, "Phuong", "Le", 7, 6),
    (8, "Steven", "Shark", 8, NULL),
    (9, "Stanley", "Lee", 9, 8);
