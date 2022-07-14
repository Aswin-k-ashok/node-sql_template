const db = require('./db')
const helper = require('../helper')
const config = require('../config')
let colors = require('colors/safe') 

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
    const sqlQuery = `INSERT INTO service_desk.ticket (board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source) VALUES (${ticket_data.board},${ticket_data.status},${ticket_data.priority},${ticket_data.sla_status},${ticket_data.work_type},${ticket_data.contract_and_agrement},${ticket_data.ticket_type},${ticket_data.owner},${ticket_data.summary},${ticket_data.notes},${ticket_data.ticket_extra_data},${ticket_data.billable},${ticket_data.tags},${ticket_data.budgeted_hours},${ticket_data.actual_hours},${ticket_data.duration},${ticket_data.source},)`

    const row = await db.query(sqlQuery)
    const newTicket = helper.emptyOrRows(row)
}
//@ desc : accept a ticket
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
//@ desc : merge ticket
async function mergeTicket(){
    const sqlQuery=``
}
//@ desc : view ticket based on filters
async function viewTicketBasedOnFilter(filter,filterType){
    const sqlQuery=`SELECT * FROM ticket WHERE ${filter}=${filterType}`
}
//@ desc : updating tickets in bulk
async function updatingTicketsInBulk(ticket_id){
    const sqlQuery=`SELECT * FROM TICKET WHERE `
}
//@ desc : link existing ticket
async function linkExistingTicket(){
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
 

module.exports = {getAllTickets,getTicket,newTicket}