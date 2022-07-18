const db = require('../services/db')
const helper = require('../helper')
const config = require('../config')
//desc c&a create
async function contract_and_agreementCreate (data){
    const sqlQuery = `INSERT INTO service_desk.contract_and_agreement (contract_and_agreement_number,contract_and_agreement_name) VALUES (?,?)`
    const row = await db.query(sqlQuery,[data.contract_and_agreement_number,data.contract_and_agreement_name])
    const newContract_and_agreement = helper.emptyOrRows(row)
    console.log(newContract_and_agreement)
    return newContract_and_agreement
}

//desc c&a view
async function contract_and_agreementView (){
    const sqlQuery = 'SELECT * FROM contract_and_agreement'
    const row = await db.query(sqlQuery)
    const contract_and_agreements = helper.emptyOrRows(row)
    return contract_and_agreements
}

//desc view a c&a
async function viewAContract_and_agreement(contract_and_agreement_id){
    const sqlQuery = `SELECT * FROM contract_and_agreement WHERE contract_and_agreement_id = ${contract_and_agreement_id}`
    const row = await db.query(sqlQuery)
    const contract_and_agreement = helper.emptyOrRows(row)
    return contract_and_agreement
}

//desc c&a edit
async function editAContract_and_agreement (contract_and_agreement_id,data){
    let contract_and_agreement = await viewAContract_and_agreement(contract_and_agreement_id)
    contract_and_agreement = contract_and_agreement[0]
    if(data.contract_and_agreement_name == contract_and_agreement.contract_and_agreement_name || data.contract_and_agreement =='' || data.contract_and_agreement == undefined){
        console.log('no change')
    }else{
        contract_and_agreement.contract_and_agreement_name = data.contract_and_agreement_name
        console.log(contract_and_agreement)
    }
    if(data.contract_and_agreement_name == contract_and_agreement.contract_and_agreement_name || data.contract_and_agreement=='' || data.contract_and_agreement == undefined){
        console.log('no change')
    }else{
        contract_and_agreement.contract_and_agreement_number = data.contract_and_agreement_number
    }

    const sqlQuery = `UPDATE service_desk.contract_and_agreement SET contract_and_agreement_number = ?, contract_and_agreement_name = ? WHERE (contract_and_agreement_id = ?)`

    const row = db.query(sqlQuery,[contract_and_agreement.contract_and_agreement_number,contract_and_agreement.contract_and_agreement_name,contract_and_agreement_id])
    const editedContract_and_agreement = helper.emptyOrRows(row)
    console.log(contract_and_agreement)
    return editedContract_and_agreement
}

//desc c&a delete
async function deleteAContract_and_agreement(contract_and_agreement_id){
    const sqlQuery = `DELETE FROM contract_and_agreement WHERE contract_and_agreement_id=?`
    const row = db.query(sqlQuery,[contract_and_agreement_id])
    return row
}





module.exports = {contract_and_agreementCreate,contract_and_agreementView,viewAContract_and_agreement,editAContract_and_agreement,deleteAContract_and_agreement} 