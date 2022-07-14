const db = require('../services/db')
const helper = require('../helper')
const config = require('../config')
//desc sla_status create
async function createNewSlaStatus (data){
    const sqlQuery = `INSERT INTO service_desk.sla_status (sla_status_name) VALUES (?)`
    const row = await db.query(sqlQuery,[data.sla_status_name])
    const newSlaStatus = helper.emptyOrRows(row)
    console.log(newSlaStatus)
    return newSlaStatus
}

//desc sla_status view
async function viewSlaStatuses (){
    const sqlQuery = 'SELECT * FROM sla_status'
    const row = await db.query(sqlQuery)
    const slaStatuses = helper.emptyOrRows(row)
    return slaStatuses
}


//desc sla_status edit
async function editSlaStatus (sla_status_id,data){
    let slaStatus = await viewSlaStatus(sla_status_id)
    slaStatus = slaStatus[0]
    if(data.sla_status_name == slaStatus.sla_status_name || data.sla_status_name =='' || data.sla_status_name == undefined){
        console.log('no change')
    }else{
        slaStatus.sla_status_name = data.sla_status_name
        console.log(slaStatus)
    }
    const sqlQuery = `UPDATE service_desk.sla_status SET sla_status_name = ? WHERE (sla_status_id = ?)`
    const row = db.query(sqlQuery,[slaStatus.sla_status_name,sla_status_id])
    const editedSlaStatus = helper.emptyOrRows(row)
    console.log(slaStatus)
    return editedSlaStatus
}


//desc sla_status delete
async function deleteSlaStatus(sla_status_id){
    const sqlQuery = `DELETE FROM sla_status WHERE sla_status_id=?`
    const row = db.query(sqlQuery,[sla_status_id])
    return row
}



module.exports = { }