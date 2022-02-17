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

pomptUser()
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
    db.query('SELECT * FROM employeetracker_db.department;', function (err, results) {
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
                    promptOptions();
                })
            })
    })
};

// ----------------add/delete employee------------------------

function addEmployee() {
    db.query('select * from company_db.employee ;', function (err, results) {
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
            var employeelast = results.employeefirstname
            var employeefirst =
            var employeeRole =

        }).
    })
}