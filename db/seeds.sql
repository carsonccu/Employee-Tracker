USE company_db

INSERT INTO department (name)
VALUES ("Sales") --1
        ("Engineering") --2
        ("Finance") --3
        ("Legal") --4

INSERT INTO role ( title, salry, department_id)
VALUES ("Sales Lead", 50000, 1)
        ("Salesperson", 35000, 1)
        ("Lead Engineer", 200000, 2)
        ("Software Engineer", 125000, 2)
        ("Account Manager", 10000, 3)
        ("Accountant", 75000, 3)
        ("Legal Team Lead", 150000, 4)
        ("Lawyer", 175000, 4)

