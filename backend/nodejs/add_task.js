/* const mysql = require("mysql2");
const connection = require("./connect");

const taskName = req.body.task_name;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const sql = `INSERT INTO tasks (id, task_name,created_at, updated_at) VALUES ('${taskName}')`;

connection.query(sql, (err, results) => {
  if (err) {
    console.error("Error adding task: " + err.message);
    return;
  }
  console.log("Task added successfully");
});

connection.end(); 

const addTask = (req,res) => {
  res.send('add task')
};



module.exports = {
  addTask
} */