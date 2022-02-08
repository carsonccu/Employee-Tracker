DROP DATABASE IF EXISTS company_db;
CREATE company_db;
USE company_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);
DROP TABLE IF EXISTS department;
CREATE TABLE employee(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
        manager_id INT,
    FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON DELETE CASCADE,
        FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL

);
