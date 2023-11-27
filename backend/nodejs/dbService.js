const mysql = require('mysql2');
/* const dotenv = require('dotenv');
dotenv.config();
 */
let instance = null;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mydb',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  } 
  console.log ('Connected to db');
})

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : (instance = new DbService());
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = 'SELECT * FROM tasks';

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        })
      })
      return response;

    } catch (error) {
      console.log(error)
    }
  }

  async insertNewName(name) {
    try {
      const dateAdded = new Date();
      const dateUpdated = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query = 'INSERT INTO names (task_name, created_at, updated_at) VALUES (?, ?, ?)';

        connection.query(query, [name, dateAdded, dateUpdated], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        })
      })
      return {
        id: insertId,
        name: name,
        dateAdded: dateAdded,
        dateUpdated: dateUpdated
      }


    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;