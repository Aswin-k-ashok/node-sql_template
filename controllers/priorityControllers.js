const db = require('../services/db')
const helper = require('../helper')
const config = require('../config')
//desc priority create
async function createNewPriority (data){
    const sqlQuery = `INSERT INTO service_desk.priority (priority_name) VALUES (?)`
    const row = await db.query(sqlQuery,[data.priority_name])
    const newPriority = helper.emptyOrRows(row)
    console.log(newPriority)
    return newPriority
}

//desc priority view
async function viewPriorities (){
    const sqlQuery = 'SELECT * FROM priority'
    const row = await db.query(sqlQuery)
    const priorities = helper.emptyOrRows(row)
    return priorities
}

//desc priority edit
async function editPriority (priority_id,data){
    let priority = await viewPriority(priority_id)
    priority = priority[0]
    if(data.priority_name == priority.priority_name || data.priority_name =='' || data.priority_name == undefined){
        console.log('no change')
    }else{
        priority.priority_name = data.priority_name
        console.log(priority)
    }
    const sqlQuery = `UPDATE service_desk.priority SET priority_name = ? WHERE (priority_id = ?)`
    const row = db.query(sqlQuery,[priority.priority_name,priority_id])
    const editedPriority = helper.emptyOrRows(row)
    console.log(priority)
    return editedPriority
}

//desc priority delete
async function deletePriority(priority_id){
    const sqlQuery = `DELETE FROM priority WHERE priority_id=?`
    const row = db.query(sqlQuery,[priority_id])
    return row
}



module.exports = { }