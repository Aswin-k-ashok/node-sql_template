const db = require('../services/db')
const helper = require('../helper')
const config = require('../config')
const mdb = require('../services/mongodb')


//@ desc : get all tickets and request

async function getAllTickets (){
    const sqlQuery = `SELECT 
    ticket_id,summary,notes,billable,tags,budgeted_hours,actual_hours,duration,board_name,status_name,priority_name,sla_status_name,owner_name,ticket_type_name,work_type_name 
    FROM ticket 
    INNER JOIN (board,status,priority,sla_status,owner,ticket_type,work_type)
    ON (board.board_id = ticket.board and status.status_id = ticket.status and priority.priority_id = ticket.priority and sla_status.sla_status_id = ticket.sla_status and owner.owner_id = ticket.owner and ticket_type.ticket_type_id = ticket.ticket_type and work_type.work_type_id = ticket.work_type);`
    const row = await db.query(sqlQuery)
    const tickets = helper.emptyOrRows(row)
    return tickets
}

//@ desc : view a ticket

async function getTicket (ticket_id){
    //const sqlQuery = `SELECT * FROM ticket WHERE ticket_id=${ticket_id}`
    const sqlQuery = `SELECT 
    ticket_id,summary,notes,billable,tags,budgeted_hours,actual_hours,duration,board_name,status_name,priority_name,sla_status_name,owner_name,ticket_type_name,work_type_name 
    FROM ticket 
    INNER JOIN (board,status,priority,sla_status,owner,ticket_type,work_type)
    ON (board.board_id = ticket.board and status.status_id = ticket.status and priority.priority_id = ticket.priority and sla_status.sla_status_id = ticket.sla_status and owner.owner_id = ticket.owner and ticket_type.ticket_type_id = ticket.ticket_type and work_type.work_type_id = ticket.work_type) WHERE ticket_id=${ticket_id};`
    const row = await db.query(sqlQuery)
    const ticket = helper.emptyOrRows(row)
    return ticket
}

//@ desc : new ticket
async function newTicket (ticket_data){
    
    const {board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id} = ticket_data
    
    const ticketThread = await mdb.get().collection('ticket').insertOne({event:"new ticket created",ticketNotes:notes})
    
    const ticketThread_id = ticketThread.insertedId.toString()

    const sqlQuery = `INSERT INTO service_desk.ticket (board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    const row = await db.query(sqlQuery,[board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,ticketThread_id,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id])

    const newTicket = helper.emptyOrRows(row)

    return newTicket
}

//@desc : update ticket 
async function updateTicket(ticket_id,ticket_data){
    let {board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id} = ticket_data


    let existingTicket = await getTicket(ticket_id)

    existingTicket = existingTicket[0]

    if(board == existingTicket.board || board ==null || board == undefined){
        board = existingTicket.board
    }
    if(status == existingTicket.status || status ==null || status == undefined){
        status = existingTicket.status
    }
    if(priority == existingTicket.priority || priority ==null || priority == undefined){
        priority = existingTicket.priority
    }
    if(sla_status == existingTicket.sla_status || sla_status ==null || sla_status == undefined){
        sla_status = existingTicket.sla_status
    }
    if(work_type == existingTicket.work_type || work_type ==null || work_type == undefined){
        work_type = existingTicket.work_type
    }
    if(contract_and_agreement == existingTicket.contract_and_agreement || contract_and_agreement ==null || contract_and_agreement == undefined){
        contract_and_agreement = existingTicket.contract_and_agreement
    }
    if(ticket_type == existingTicket.ticket_type || ticket_type ==null || ticket_type == undefined){
        ticket_type = existingTicket.ticket_type
    }
    if(owner == existingTicket.owner || owner ==null || owner == undefined){
        owner = existingTicket.owner
    }
    if(summary == existingTicket.summary || summary ==null || summary == undefined){
        summary = existingTicket.summary
    }
    if(notes == existingTicket.notes || notes ==null || notes == undefined){
        notes = existingTicket.notes
    }
    if(ticket_extra_data == existingTicket.ticket_extra_data || ticket_extra_data ==null || ticket_extra_data == undefined){
        ticket_extra_data = existingTicket.ticket_extra_data
    }
    if(billable == existingTicket.billable || billable ==null || billable == undefined){
        billable = existingTicket.billable
    }
    if(tags == existingTicket.tags || tags ==null || tags == undefined){
        tags = existingTicket.tags
    }
    if(budgeted_hours == existingTicket.budgeted_hours || budgeted_hours ==null || budgeted_hours == undefined){
        budgeted_hours = existingTicket.budgeted_hours
    }
    if(actual_hours == existingTicket.actual_hours || actual_hours ==null || actual_hours == undefined){
        actual_hours = existingTicket.actual_hours
    }
    if(duration == existingTicket.duration || duration ==null || duration == undefined){
        duration = existingTicket.duration
    }
    if(source == existingTicket.source || source ==null || source == undefined){
        source = existingTicket.source
    }
    if(has_parent == existingTicket.has_parent || has_parent ==null || has_parent == undefined){
        has_parent = existingTicket.has_parent
    }
    if(parent_id == existingTicket.parent_id || parent_id ==null || parent_id == undefined){
        parent_id = existingTicket.parent_id
    }
    
    const sqlQuery = `UPDATE ticket SET board=?,status=?,priority=?,sla_status=?,work_type=?,contract_and_agreement=?,ticket_type=?,owner=?,summary=?,notes=?,ticket_extra_data=?,billable=?,tags=?,budgeted_hours=?,actual_hours=?,duration=?,source=?,has_parent=?,parent_id=? WHERE ticket_id=?`
    
    
    
    const row = await db.query(sqlQuery,[board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id,ticket_id])
    
    const updatedTicket = helper.emptyOrRows(row)
    
    return updatedTicket
}

//@ desc : accept a ticket
async function acceptTicket(ticket_id){
    const sqlQuery = `UPDATE ticket SET status=? WHERE ticket_id=?`
    
    const row = await db.query(sqlQuery,[3,ticket_id])
    const acceptedTicket = helper.emptyOrRows(row)
    return acceptedTicket
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

//@ desc : attribute create
async function attributeCreate(){
    const sqlQuery=``
}

//@ desc : link existing ticket
async function linkExistingTicket(parent_ticket_id,child_ticket_id){
    const sqlQuery=`UPDATE ticket SET has_parent=?,parent_id=? WHERE ticket_id=?`
    const row = await db.query(sqlQuery,[true,parent_ticket_id,child_ticket_id])
    const updatedTicket = helper.emptyOrRows(row)

    return updatedTicket
}

//@ desc : view ticket based on board
async function viewTicketBasedOnBoard(ticket_board){
    const sqlQuery = `SELECT * FROM ticket where ticket_board=?`
}

//@ desc : reply a ticket by adding notes
async function replyTicket(){
    const sqlQuery = ``
}


//@ desc : view ticket based on filters
async function viewTicketBasedOnFilter(filter,filterType){
    
    const sqlQuery=`SELECT 
    ticket_id,summary,notes,billable,tags,budgeted_hours,actual_hours,duration,board_name,status_name,priority_name,sla_status_name,owner_name,ticket_type_name,work_type_name 
    FROM ticket 
    INNER JOIN (board,status,priority,sla_status,owner,ticket_type,work_type)
    ON (board.board_id = ticket.board and status.status_id = ticket.status and priority.priority_id = ticket.priority and sla_status.sla_status_id = ticket.sla_status and owner.owner_id = ticket.owner and ticket_type.ticket_type_id = ticket.ticket_type and work_type.work_type_id = ticket.work_type) WHERE ${filter}=${filterType}`

    const ticket = await db.query(sqlQuery)
    const ticketList = helper.emptyOrRows(ticket)
    return ticketList
}

//@ desc : updating tickets in bulk
async function updatingTicketsInBulk(ticket_id){
    const sqlQuery=`SELECT * FROM TICKET WHERE `
}

//@ desc : new child ticket
async function newChildTicket(parent_id,ticket_data){

    let {board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent} = ticket_data
    
    has_parent = true

    const sqlQuery = `INSERT INTO service_desk.ticket (board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    const row = await db.query(sqlQuery,[board,status,priority,sla_status,work_type,contract_and_agreement,ticket_type,owner,summary,notes,ticket_extra_data,billable,tags,budgeted_hours,actual_hours,duration,source,has_parent,parent_id])

    const newChildTicket = helper.emptyOrRows(row)

    return newChildTicket
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
        const ticketThread = await mdb.get().collection('ticket').insertOne({event:"new ticket created"})
        console.log(ticketThread.insertedId.toString())

        return result
}

module.exports = {getAllTickets,getTicket,newTicket,updateTicket,linkExistingTicket,viewTicketBasedOnFilter,newChildTicket,mongoTest}