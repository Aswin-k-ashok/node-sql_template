const db = require('../services/db')
const helper = require('../helper')
const config = require('../config')

//desc ticket_type create
async function createNewTicketType (data){
    const sqlQuery = `INSERT INTO service_desk.ticket_type (ticket_type_name) VALUES (?)`
    const row = await db.query(sqlQuery,[data.ticket_type_name])
    const newTicketType = helper.emptyOrRows(row)
    console.log(newTicketType)
    return newTicketType
}

//desc ticket_type view
async function viewTicketTypes (){
    const sqlQuery = 'SELECT * FROM ticket_type'
    const row = await db.query(sqlQuery)
    const ticketTypes = helper.emptyOrRows(row)
    return ticketTypes
}

//desc ticket_type edit
async function editTicketType (ticket_type_id,data){
    let ticketType = await viewTicketType(ticket_type_id)
    ticketType = ticketType[0]
    if(data.ticket_type_name == ticketType.ticket_type_name || data.ticket_type_name =='' || data.ticket_type_name == undefined){
        console.log('no change')
    }else{
        ticketType.ticket_type_name = data.ticket_type_name
        console.log(ticketType)
    }
    const sqlQuery = `UPDATE service_desk.ticket_type SET ticket_type_name = ? WHERE (ticket_type_id = ?)`
    const row = db.query(sqlQuery,[ticketType.ticket_type_name,ticket_type_id])
    const editedTicketType = helper.emptyOrRows(row)
    console.log(ticketType)
    return editedTicketType
}

//desc ticket_type delete
async function deleteTicketType(ticket_type_id){
    const sqlQuery = `DELETE FROM ticket_type WHERE ticket_type_id=?`
    const row = db.query(sqlQuery,[ticket_type_id])
    return row
}


module.exports = { }