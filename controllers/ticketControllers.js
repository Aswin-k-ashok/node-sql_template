const db = require('../services/db')
const helper = require('../helper')
const config = require('../config')
const mdb = require('../services/mongodb')


//@ desc : get all tickets and request

async function getAllTickets (){
    const row = await db.query('select * from ticket')
    const tickets = helper.emptyOrRows(row)
    return tickets
}

//@ desc : view a ticket

async function getTicket (ticket_id){
    const sqlQuery = `SELECT * FROM ticket WHERE ticket_id=${ticket_id}`
    const row = await db.query(sqlQuery)
    const ticket = helper.emptyOrRows(row)
    return ticket
}

//@ desc : new ticket
async function newTicket (ticket_data){
    
    const {board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id} = ticket_data
    
    console.log(board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id)
    
    const sqlQuery = `INSERT INTO service_desk.ticket (board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    const row = await db.query(sqlQuery,[board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id])
    const newTicket = helper.emptyOrRows(row)

    return newTicket
}

//@ desc : accept a ticket
async function acceptTicket(){

}

//@ desc : view ticket based on board
async function viewTicketBasedOnBoard(ticket_board){
    const sqlQuery = `SELECT * FROM ticket where ticket_board=?`
}

//@ desc : reply a ticket by adding notes
async function replyTicket(){
    const sqlQuery = ``
}

//@ desc : add additional details 
async function additionalDetails (){

}

//@ desc : forward / escalate a ticket
async function forwardEscalateTicket(){
}

//@ desc : merge ticket
async function mergeTicket(){
    const sqlQuery=``
}

//@ desc : view ticket based on filters
async function viewTicketBasedOnFilter(filter,filterType){
    const sqlQuery=`SELECT * FROM ticket WHERE ${filter}=${filterType}`
    const ticket = await db.query(sqlQuery)
    return ticket
}

//@ desc : updating tickets in bulk
async function updatingTicketsInBulk(ticket_id){
    const sqlQuery=`SELECT * FROM TICKET WHERE `
}

//@ desc : link existing ticket
async function linkExistingTicket(parent_ticket_id,child_ticket_id){
    const sqlQuery=``
}

//@ desc : new child ticket
async function newChildTicket(){
    const sqlQuery = ``
}

//@ desc : attribute create
async function attributeCreate(){
    const sqlQuery=``
}

//@ desc : attribute read 
async function attributeRead(){
    const sqlQuery=``
}

//@ desc : attribute update 
async function attributeUpdate(){
    const sqlQuery=``
}

//@ desc : attribute delete 
async function attributeDelete(){
    const sqlQuery=``
}

//@ desc : task scheduling 
async function taskScheduling(){
    const sqlQuery=``
}

//@ desc : assets & devices create 
async function assetsAndDevicesCreate(){
    const sqlQuery=``
}

//@ desc : assets & devices read 
async function assetsAndDevicesRead(){
    const sqlQuery=``
}

//@ desc : assets & devices update 
async function assetsAndDevicesUpdate(){
    const sqlQuery = ``
}

//@ desc : assets & devices delete 
async function assetsAndDevicesDelete(){
    const sqlQuery=``
}

//@ desc : doucument uploading 
async function documentsUploading(){
    const sqlQuery=``
}

//@ desc : documents adding , adding KB based doucment to the ticket 
async function documentsAddingFromKb(){
    const sqlQuery = ``
}

//@ desc : adding files to attachment 
async function addingFilesToAttachment(){
    const sqlQuery =``
}

//@ desc : add ticket into the queue 
async function addTicketToQueue(){
    const sqlQuery = ``
}

//@ desc : remove ticket from queue 
async function removeTicketFromQueue(){
    const sqlQuery = ``
}

 

///////////////////////////////////

async function mongoTest(data){        
        const result = await mdb.get().collection('ticket').insertOne(data)
        return result
}

module.exports = {getAllTickets,getTicket,newTicket,mongoTest}