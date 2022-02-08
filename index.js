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
        if
    })
}