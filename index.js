const { prompt } = require("inquirer");
const inquirer = require("inquirer");
const mysql = require("mysql2");
require('dotenv').config()

// create connection

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log("connected to db")
);
db.connect((err) => {
    if (err) {
        throw error;
    }
});
// run inquirer

promptUser()
function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            name: "displayoptions",
            message: "Choose An Option",
            choices: ["SHOW All Departments", "SHOW All Roles", "SHOW All Employees", "SHOW Employees by Department", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Delete Department", "Delete Role", "Delete Employee", "View Department Budget"]
        }
    ])

        .then((options) => {
            if (options.displayoptions === "SHOW All Departments") {
                viewDepartments();
            }
            if (options.displayoptions === "SHOW All Roles") {
                viewRoles();
            }
            if (options.displayoptions === "SHOW All Employees") {
                viewEmployees();
            }
            if (options.displayoptions === "SHOW Employees by Department") {
                viewEmployeesByDepartment();
            }
            if (options.displayoptions === "Add Department") {
                addDepartment();
            }
            if (options.displayoptions === "Add Role") {
                addRole();
            }
            if (options.displayoptions === "Add Employee") {
                addEmployee();
            }
            if (options.displayoptions === "Update Employee Role") {
                updateEmployee();
            }
            if (options.displayoptions === "Delete Department") {
                deleteDepartment();
            }
            if (options.displayoptions === "Delete Role") {
                deleteRole();
            }
            if (options.displayoptions === "Delete Employee") {
                deleteEmployee();
            }
            if (options.displayoptions === "View Department Budget") {
                viewBudget();
            }

        })
};
// -------------------------VIEWS--------------------------------

function viewDepartments() {
    db.query('SELECT * FROM company_db.department;', function (err, results) {
        console.table(results)
        promptUser()
    })
}
function viewRoles() {
    db.query('select role.title, role.id, role.salary, department.name from department RIGHT JOIN role on department.id = role.department_id;', function (err, results) {
        console.table(results)
        promptUser()
    })
}
function viewEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', function (err, results) {
        console.table(results)
        promptUser()
    })
}

function viewBudget() {
    db.query('SELECT * FROM company_db.department;', function (err, results) {
        let departmentoptions = [];
        results.forEach(result => departmentoptions.push({ name: result.name, value: result.id }));

        return inquirer.prompt([
            {
                type: "list",
                name: "viewDepartment",
                message: "Choose a department budget to see?",
                choices: departmentoptions
            },
        ])
            .then((answer) => {
                let departmentID = answer.viewDepartment;
                db.query('SELECT SUM(role.salary) AS department_budget from employee JOIN role ON employee.role_id = role.id WHERE role.department_id = ?', [departmentID], function (err, results) {
                    console.table(results)
                    promptUser();
                })
            })
    })
};

// ----------------add/delete employee------------------------

function addEmployee() {
    db.query('SELECT * from company_db.employee;', function (err, results) {
        return inquirer.prompt([
            {
                type: "input",
                name: "employeefirstname",
                message: "Please enter first name"
            },
            {
                type: "input",
                name: "employeelastname",
                messgae: "Enter employees last name"
            },
            {
                type: "input",
                name: "employeeRole",
                messgae: "Enter employees role"
            },
        ]).then((results) => {
            var employeelast = results.employeelastname;
            var employeefirst = results.employeefirstname;
            var employeeR = results.employeeRole;
            db.query('select * from `company_db.employee where manager_id is null;', function (err, results) {
                var employeeArray = [];
                results.forEach(result => employeeArray.push({ name: result.first_name + ' ' + result.last_name, value: result.id }));
                return inquirer.prompt([
                    {
                        type: "list",
                        name: "employeeManager",
                        message: "Who is the manager?",
                        choices: employeeArray

                    },


                ]).then((data) => {
                    db.query(`INSERT INTO company_db.employee (company_db.employee.first_name, company_db.employee.last_name, company_db.employee.role_id, company_db.employee.manager_id) Values("${employeefirst}", "${employeelast}",${employeeR}, ${data.employeeManager})`, function (err, results) {
                        console.log(err);
                    })
                    viewEmployees();
                    promptUser();
                })

            })
        })
    })
}

function addDepartment() {

    return inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "Please enter a department name"
        }
    ]).then((results) => {


        db.query(` INSERT INTO department set name = ("${results.departmentName}") ;`
            , function (err, results) {
                viewDepartments()
                promptUser()
            })
    }
    )

}
function addRole() {
    db.query('SELECT * FROM company_db.department;', function (err, results) {
        let departmentArray = [];
        results.forEach(result => departmentArray.push({ name: result.name, value: result.id }));
        return inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the name?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary?"
            },
            {
                type: "list",
                name: "roleDepartment",
                message: "What department is it in?",
                choices: departmentArray
            },

        ])
            .then((answers) => {

                db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.roleName, answers.roleSalary, answers.roleDepartment], function (err, results) {
                    console.log(err);
                })
                promptUser();
            })
    })
};

function deleteDepartment() {
    db.query('SELECT * FROM company_db.department;', function (err, results) {
        let departmentOptions = [];
        results.forEach(result => departmentOptions.push({ name: result.name, value: result.id }));

        return inquirer.prompt([
            {
                type: "list",
                name: "deleteDepartment",
                message: "Which department would you like to delete?",
                choices: departmentOptions
            },
        ])
            .then((answer) => {
                let departmentID = answer.deleteDepartment;
                db.query('DELETE FROM department WHERE id = ?', [departmentID], function (err, results) {
                    promptUser();
                })
            })
    })
};
function deleteRole() {
    db.query('SELECT * FROM company_db.role;', function (err, results) {
        let roleOptions = [];
        results.forEach(result => roleOptions.push({ name: result.title, value: result.id }));

        return inquirer.prompt([
            {
                type: "list",
                name: "deleteRole",
                message: "Which role would you like to delete?",
                choices: roleOptions
            },
        ])
            .then((answer) => {
                let roleID = answer.deleteRole;
                db.query('DELETE FROM role WHERE id = ?', [roleID], function (err, results) {
                    promptUser();
                })
            })
    })
};
function deleteEmployee() {
    db.query('SELECT * FROM company_db.employee;', function (err, results) {
        let employeeOptions = [];
        results.forEach(result => employeeOptions.push({ name: result.first_name + ' ' + result.last_name, value: result.id }));
        return inquirer.prompt([
            {
                type: "list",
                name: "deleteEmployee",
                message: "Which employee would you like to fire/delete?",
                choices: employeeOptions
            },
        ])
            .then((answer) => {
                let employeeID = answer.deleteEmployee;
                db.query('DELETE FROM employee WHERE id = ?', [employeeID], function (err, results) {
                    promptUser();
                })
            })
    })
};