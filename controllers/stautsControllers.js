const db = require('../services/db')
const helper = require('../helper')
const config = require('../config')

//desc status create
async function createNewStatus (data){
    const sqlQuery = `INSERT INTO service_desk.status (status_name) VALUES (?)`
    const row = await db.query(sqlQuery,[data.status_name])
    const newStatus = helper.emptyOrRows(row)
    console.log(newStatus)
    return newStatus
}

//desc status view
async function viewStatuses (){
    const sqlQuery = 'SELECT * FROM status'
    const row = await db.query(sqlQuery)
    const statuses = helper.emptyOrRows(row)
    return statuses
}

//desc status edit
async function editStatus (status_id,data){
    let status = await viewStatus(status_id)
    status = status[0]
    if(data.status_name == status.status_name || data.status_name =='' || data.status_name == undefined){
        console.log('no change')
    }else{
        status.status_name = data.status_name
        console.log(status)
    }
    const sqlQuery = `UPDATE service_desk.status SET status_name = ? WHERE (status_id = ?)`
    const row = db.query(sqlQuery,[status.status_name,status_id])
    const editedStatus = helper.emptyOrRows(row)
    console.log(status)
    return editedStatus
}

//desc status delete
async function deleteStatus(status_id){
    const sqlQuery = `DELETE FROM status WHERE status_id=?`
    const row = db.query(sqlQuery,[status_id])
    return row
}

module.exports = {createNewStatus,viewStatuses,editStatus,deleteStatus} 