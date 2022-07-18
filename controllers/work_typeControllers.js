const db = require('../services/db')
const helper = require('../helper')
const config = require('../config')

//desc work_type create
async function createNewWorkType (data){
    const sqlQuery = `INSERT INTO service_desk.work_type (work_type_name) VALUES (?)`
    const row = await db.query(sqlQuery,[data.work_type_name])
    const newWorkType = helper.emptyOrRows(row)
    console.log(newWorkType)
    return newWorkType
}

//desc work_type view
async function viewWorkTypes (){
    const sqlQuery = 'SELECT * FROM work_type'
    const row = await db.query(sqlQuery)
    const workTypes = helper.emptyOrRows(row)
    return workTypes
}

//desc work_type edit
async function editWorkType (work_type_id,data){
    let workType = await viewWorkType(work_type_id)
    workType = workType[0]
    if(data.work_type_name == workType.work_type_name || data.work_type_name =='' || data.work_type_name == undefined){
        console.log('no change')
    }else{
        workType.work_type_name = data.work_type_name
        console.log(workType)
    }
    const sqlQuery = `UPDATE service_desk.work_type SET work_type_name = ? WHERE (work_type_id = ?)`
    const row = db.query(sqlQuery,[workType.work_type_name,work_type_id])
    const editedWorkType = helper.emptyOrRows(row)
    console.log(workType)
    return editedWorkType
}

//desc work_type delete
async function deleteWorkType(work_type_id){
    const sqlQuery = `DELETE FROM work_type WHERE work_type_id=?`
    const row = db.query(sqlQuery,[work_type_id])
    return row
}

module.exports = {createNewWorkType,viewWorkTypes,editWorkType,deleteWorkType }