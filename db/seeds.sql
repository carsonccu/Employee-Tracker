USE company_db

INSERT INTO department (name)
VALUES ("Sales"), -- 1
        ("Engineering"), -- 2
        ("Finance"), -- 3 
        ("Legal"); -- 4

INSERT INTO role ( title, salary, department_id)
VALUES ("Sales Lead", 50000, 1), -- 1
        ("Salesperson", 35000, 1), -- 2
        ("Lead Engineer", 200000, 2), -- 3
        ("Software Engineer", 125000, 2), -- 4
        ("Account Manager", 10000, 3), -- 5
        ("Accountant", 75000, 3), -- 6
        ("Legal Team Lead", 150000, 4), -- 7
        ("Lawyer", 175000, 4); -- 8

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Butch", "Cassidy", 7, NULL), -- 1
        ("Sundance", "Kid", 8, NULL), -- 2
        ("John", "Wayne", 4, NULL), -- 3
        ("Carson", "Colgate", 3, 5, NULL), -- 4
        ("Jesse", "James", 6, 2, NULL), -- 5
        ("Wild", "Bill", 1, 5, NULL); -- 6
       