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

// run inquirer

pomptUser()
function promptUser(){
    return inquirer.prompt([
        {
            type: "list",
            name: "displayoptions",
            message: "Choose An Option",
            choices: ["SHOW All Departments", "SHOW All Roles", "SHOW All Employees", "SHOW Employees by Department", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Delete Department", "Delete Role", "Delete Employee", "View Department Budget"]
        }
    ])

    .then((options) => {
        if (options.displayoptions === "SHOW All Departments"){
            viewDepartments();
        }
        if (options.displayoptions === "SHOW All Roles"){
            viewRoles();
        }
        if (options.displayoptions === "SHOW All Employees"){
            viewEmployees();
        }
        if (options.displayoptions === "SHOW Employees by Department"){
            viewEmployeesByDepartment();
        }
        if (options.displayoptions === "Add Department"){
            addDepartment();
        }
        if (options.displayoptions === "Add Role"){
            addRole();
        }
        if (options.displayoptions === "Add Employee"){
            addEmployee();
        }
        if (options.displayoptions === "Update Employee Role"){
            updateEmployee();
        }
        if (options.displayoptions === "Delete Department"){
            deleteDepartment();
        }
        if (options.displayoptions === "Delete Role"){
            deleteRole();
        }
        if (options.displayoptions === "Delete Employee"){
            deleteEmployee();
        }
        if (options.displayoptions === "View Department Budget"){
            viewBudget();
        }

    })
};