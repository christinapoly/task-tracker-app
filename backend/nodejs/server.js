const express = require('express');
const app = express();
const cors = require('cors');
/* const dotenv = require('dotenv');
dotenv.config();
 */
const dbService = require('./dbService')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


//add
app.post('/add', (req, res) => {
  const { task_name } = req.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertNewName(task_name);

  result
  .then(data => res.json({ data : data}))
  .catch(err => console.log(err))
})

//read
app.get('/tasks', (req, res) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllData();
  result
  .then(data => res.json({data : data}))
  .catch(err => console.log(err));
  })

//update
app.patch('/update', (req, res) => {
  const { id, task_name } = request.body;
  const db = dbService.getDbServiceInstance();

  const result = db.updateNameById(id, task_name);
  
  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));
});


//delete





//listen
app.listen(3000, () => {
  console.log("app is running")
});