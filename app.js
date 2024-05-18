const express = require('express');
const path = require('path');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3')
const {v4: uuidv4} = require('uuid');
const app = express()
app.use(express.json())
const dbpath = path.join(__dirname,'chinook.db');
let db = null;
const initializeDBAndServer = async () => {
    try{
        db = await open({
            filename: dbpath,
            driver: sqlite3.Database,
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log('Started')
        })
    }catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};
initializeDBAndServer();
app.post('/todos/', async (request, response) => {
    const todoDetails = request.body
    const {id,title} = todoDetails
    const api3 = `INSERT INTO
                  todo_details(id,title)
                  VALUES(${id},'${title}');`
    const result3 = await db.run(api3)
    response.send(`Todo Successfully Added with ID ${id}`)
  })


  app.get('/', async (request, response) => {
    const api3 = `SELECT * FROM todo_details;`
    const result3 = await db.all(api3)
    response.send(result3)
  })

module.exports = app