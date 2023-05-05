// package.json install file
const mysql = require('mysql2');
const inquirer = require('inquirer');
//using mysql2 to create a connection to get my chart
const database = mysql.createConnection(
    // detail of the chart in dql workbench
        {
            host: 'localhost',
            // MySQL username,
            user: 'root',
            // MySQL password
            password: 'Dragonseye3$',
            database: 'employee_tracker_db'
        },
        //testing the connection
        console.log(`Connected to the employee_tracker_db database.`)
    );
//connect chart with query then select (* means all) from the chart called employee
database.query("SELECT * FROM employee", (err, result) => {
    console.log("hello")
})
// calling the function on line 25
    topices();
// making the list when using (node server.js) with the help from inquirer
    function topices(){
        inquirer.prompt([
            {
                //the format will be in list
                type: "list",
                //the thing to do
                message: "select options:",
                // the name of the chart below
                name: "company",
                choices: [
                    "All department",
                    "All roles",
                    "All employees",
                    "Add department",
                    "Add roles",
                    "Add new hire",
                    "Update employee role"
                ]
            }
            // after one above gets pick (.then) the answer combine with it using(.)
         ]).then(answers => {
            //the combining part
            switch (answers.company) {
                case "All department":
                    //call line 86
                    viewDepartment();
                    break;
                case "All roles":
                    //call line 94
                    viewRoles();
                    break;
                case "All employees":
                    //call line 101
                    viewEmployees();
                    break;
                case "Add department":
                    //call line 109
                    addDepartment();
                    break;
                case "Add roles":
                    //call line 134
                    addRoles();
                    break;
                case "Add new hire":
                    //call line 174
                    addHire();
                    break;
                // case "Update employee role":
                //     //call line
                //     updateRole();
                //    break;
                default:
                    //
                    process.exit();
            }
            // if there an error tell me
         }).catch(err => console.error(err));
    }

////////////////////////////////////////////

const viewDepartment = () => {
        //goes to the database and select (* all) from the department table
        database.query(`SELECT * FROM department`, (err, results) => {
            // if error (? or) console error stop but if success put it in a table format
            err ? console.error(err) : console.table(results);
        })
        return null
    };

const viewRoles = () => {
    //goes to the database and select (* all) from the roles table
    database.query(`SELECT * FROM roles`, (err, results) => {
        // if error (? or) console error stop but if success put it in a table format
        err ? console.error(err) : console.table(results);
    })
    return null
};

const viewEmployees = () => {
    //goes to the database and select (* all) from the employee table
    database.query(`SELECT * FROM employee`, (err, results) => {
        // if error (? or) console error stop but if success put it in a table format
        err ? console.error(err) : console.table(results);

    })
    return null
}
//when picked addDepartment
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Name the department you like to add?",
                name: "addDepartment"
            }
        ]).then(answers => {
            //put your answers in the table in department in the group name
            database.query(`INSERT INTO department(name)
                    VALUES(?)`, answers.addDepartment, (err, results) => {
                        //show the answer in the department // if there an error console it
                if (err) {
                    console.log(err)
                } else {
                    //goes to the database and select (* all) from the department table
                    database.query(`SELECT * FROM department`, (err, results) => {
                        // if error (? or) console error stop but if success put it in a table format
                        err ? console.error(err) : console.table(results);

                    })
                }
            }
            )
        })
        return null
};
//when picked addRoles
const addRoles = () => {
    /////////////////the choices from below put in database from department
    const deptChoices = () => database.promise().query(`SELECT * FROM department`)
        .then((rows) => {
            let arrNames = rows[0].map(obj => obj.name);
            console.log("ROW :",rows[0])
            return arrNames
        })
    inquirer
        .prompt([
            {
                type: "input",
                message: "What title of the role you'd add?",
                name: "Title"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "Salary"
            },
            {
                type: "list",
                message: "Which department is this role in?",
                name: "Department",
                choices: deptChoices
            }
        ]).then(answers => {
            // move the id from department and moves it to department_id
            database.promise().query(`SELECT id FROM department WHERE name = ?`, answers.Department)
                .then(answer => {
                    let mappedId = answer[0].map(obj => obj.id);
                    // console.log(mappedId[0])
                    return mappedId[0]
                })
                .then((mappedId) => {
                    //the answers from above gets put into the chart
                    database.promise().query(`INSERT INTO roles(title, salary, department_id)
                VALUES(?, ?, ?)`, [answers.Title, answers.Salary, mappedId]);

                })
        })
        return console.log("added new role!")
};

const addHire = () => {
    const rollChoices = () => database.promise().query(`SELECT * FROM roles`)
    .then((rows) => {
        let arrNames = rows[0].map(obj => obj.title);
        console.log(arrNames)
        return arrNames
    })
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "lastName"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "employeeRole",
                choices: rollChoices
            }
        ]).then(answers => {
            // the first and last name get puts into the chart
            database.query(`INSERT INTO employee(first_name, last_name)
                    VALUES(?, ?)`, [answers.firstName, answers.lastName], (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    //goes to the database and select (* all) from the employee table
                    database.query(`SELECT * FROM employee`, (err, results) => {
                        // if error (? or) console error stop but if success put it in a table format
                        err ? console.error(err) : console.table(results);

                    })
                }
            }
            )
        })
        return null
 
}