const db = require('./db')
const helper = require('../helper')
const config = require('../config')
let colors = require('colors/safe');


 async function getTickets(page =1) {
    const offset = helper.getOffset(page,config.listPerPage);
    const rows = await db.query('SELECT * FROM ticket ', [config.listPerPage, ]);
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    // console.log(colors.green(data))
    // console.log(colors.yellow(rows))
    // console.log(colors.blue(meta))
    return {
        data,meta
    }
}

async function getOneTicket(ticket_id){
    console.log(ticket_id)
    const rows = await db.query('SELECT * FROM ticket WHERE ticket_id = ?', [ticket_id]);
    const data = helper.emptyOrRows(rows);

    return data
}

async function createOneTicket(ticket_data){
    const sqlQuery = 'INSERT INTO ticket where summary = ?, board = ?, status = ?, priority = ?, sla_status = ?, work_type = ?, ticket_notes = ?, ticet_type = ?, contact_and_agreement = ?, attachments = ?, devices_and_assests = ?, documents = ?, checklist = ?, billable = ?, customer = ?, user = ?, site = ?, email = ?, contact_number = ?, time_zone = ?';
     const rows = await db.query(sqlQuery,[ticket_data.summary,ticket_data.board,ticket_data.status,ticket_data.priority,ticket_data.sla_status,ticket_data.work_type,ticket_data.ticket_notes,ticket_data.ticet_type,ticket_data.contact_and_agreement,ticket_data.attachments,ticket_data.devices_and_assests,ticket_data.documents,ticket_data.checklist,ticket_data.billable,ticket_data.customer,ticket_data.user,ticket_data.site,ticket_data.email,ticket_data.contact_number,ticket_data.time_zone] );
     const data = helper.emptyOrRows(rows);
    return data
}

async function updateTicket(ticket_id,ticketDataFromBody){
    const selectSqlQuery = 'SELECT * FROM ticket WHERE ticket_id = ?';

    const {summary,board,status,priority,sla_staus,work_type,ticket_notes,ticet_type,contact_and_agreement,attachments,devices_and_assests,documents,checklist,billable,customer,user,site,email,contact_number,time_zone} = ticketDataFromBody;

    let ticket = await db.query (selectSqlQuery, [ticket_id]);
    ticket = ticket[0]

   if(summary != ticket.summary && summary != ''){
       console.log('summary updated')
   }else{
       console.log('summary not updated')
   }
   if(board != ticket.board && board != ''){
         console.log('board updated')
    }else{
        console.log('board not updated')
    }
    if(status != ticket.ticket_status && status != ''){
        console.log('status updated')
        await db.query('UPDATE ticket SET ticket_status = ? WHERE ticket_id = ?', [status,ticket_id]);
    }else{
        console.log('status not updated')
    }
    if(priority != ticket.priority && priority != ''){ 
        console.log('priority updated')
    }else{
        console.log('priority not updated')
    }
    if(sla_staus != ticket.sla_staus && sla_staus != ''){
        console.log('sla_staus updated')
    }else{
        console.log('sla_staus not updated')
    }
    if(work_type != ticket.work_type && work_type != ''){
        console.log('work_type updated')
    }else{
        console.log('work_type not updated')
    }
    if(ticket_notes != ticket.ticket_notes && ticket_notes != ''){
        console.log('ticket_notes updated')
    }else{
        console.log('ticket_notes not updated')
    }
    if(ticet_type != ticket.ticet_type && ticet_type != ''){
        console.log('ticet_type updated')
    }else{
        console.log('ticet_type not updated')
    }
    if(contact_and_agreement != ticket.contact_and_agreement && contact_and_agreement != ''){
        console.log('contact_and_agreement updated')
    }else{
        console.log('contact_and_agreement not updated')
    }
    if(attachments != ticket.attachments && attachments != ''){
        console.log('attachments updated')
    }else{
        console.log('attachments not updated')
    }
    if(devices_and_assests != ticket.devices_and_assests && devices_and_assests != ''){
        console.log('devices_and_assests updated')
    }else{
        console.log('devices_and_assests not updated')
    }
    if(documents != ticket.documents && documents != ''){
        console.log('documents updated')
    }else{
        console.log('documents not updated')
    }
    if(checklist != ticket.checklist && checklist != ''){
        console.log('checklist updated')
    }else{
        console.log('checklist not updated')
    }
    if(billable != ticket.billable && billable != ''){
        console.log('billable updated')
    }else{
        console.log('billable not updated')
    }
    if(customer != ticket.customer && customer != ''){
        console.log('customer updated')
    }else{
        console.log('customer not updated')
    }
    if(user != ticket.user && user != ''){
        console.log('user updated')
    }else{
        console.log('user not updated')
    }
    if(site != ticket.site && site != ''){
        console.log('site updated')
    }
    if(email != ticket.email && email != ''){
        console.log('email updated')
    }
    if(contact_number != ticket.contact_number && contact_number != ''){
        console.log('contact_number updated')
    }else{
        console.log('contact_number not updated')
    }
    if(time_zone != ticket.time_zone && time_zone != ''){
        console.log('time_zone updated')
    }
    else{
        console.log('time_zone not updated')
    }
    
    // const updateTicket = await db.query('UPDATE ticket SET summary = ?, board = ?, status = ?, priority = ?, sla_status = ?, work_type = ?, ticket_notes = ?, ticet_type = ?, contact_and_agreement = ?, attachments = ?, devices_and_assests = ?, documents = ?, checklist = ?, billable = ?, customer = ?, user = ?, site = ?, email = ?, contact_number = ?, time_zone = ? WHERE ticket_id = ?', [summary,board,status,priority,sla_staus,work_type,ticket_notes,ticet_type,contact_and_agreement,attachments,devices_and_assests,documents,checklist,billable,customer,user,site,email,contact_number,time_zone,ticket_id]);

    console.log(ticket);

    async function updateMultipleTickets (ticket_ids){
        if(summary != ticket.summary && summary != ''){
            console.log('summary updated')
        }else{
            console.log('summary not updated')
        }
        if(board != ticket.board && board != ''){
              console.log('board updated')
         }else{
             console.log('board not updated')
         }
         if(status != ticket.ticket_status && status != ''){
             console.log('status updated')
             await db.query('UPDATE ticket SET ticket_status = ? WHERE ticket_id = ?', [status,ticket_id]);
         }else{
             console.log('status not updated')
         }
         if(priority != ticket.priority && priority != ''){ 
             console.log('priority updated')
         }else{
             console.log('priority not updated')
         }
         if(sla_staus != ticket.sla_staus && sla_staus != ''){
             console.log('sla_staus updated')
         }else{
             console.log('sla_staus not updated')
         }
         if(work_type != ticket.work_type && work_type != ''){
             console.log('work_type updated')
         }else{
             console.log('work_type not updated')
         }
         if(ticket_notes != ticket.ticket_notes && ticket_notes != ''){
             console.log('ticket_notes updated')
         }else{
             console.log('ticket_notes not updated')
         }
         if(ticet_type != ticket.ticet_type && ticet_type != ''){
             console.log('ticet_type updated')
         }else{
             console.log('ticet_type not updated')
         }
         if(contact_and_agreement != ticket.contact_and_agreement && contact_and_agreement != ''){
             console.log('contact_and_agreement updated')
         }else{
             console.log('contact_and_agreement not updated')
         }
         if(attachments != ticket.attachments && attachments != ''){
             console.log('attachments updated')
         }else{
             console.log('attachments not updated')
         }
         if(devices_and_assests != ticket.devices_and_assests && devices_and_assests != ''){
             console.log('devices_and_assests updated')
         }else{
             console.log('devices_and_assests not updated')
         }
         if(documents != ticket.documents && documents != ''){
             console.log('documents updated')
         }else{
             console.log('documents not updated')
         }
         if(checklist != ticket.checklist && checklist != ''){
             console.log('checklist updated')
         }else{
             console.log('checklist not updated')
         }
         if(billable != ticket.billable && billable != ''){
             console.log('billable updated')
         }else{
             console.log('billable not updated')
         }
         if(customer != ticket.customer && customer != ''){
             console.log('customer updated')
         }else{
             console.log('customer not updated')
         }
         if(user != ticket.user && user != ''){
             console.log('user updated')
         }else{
             console.log('user not updated')
         }
         if(site != ticket.site && site != ''){
             console.log('site updated')
         }
         if(email != ticket.email && email != ''){
             console.log('email updated')
         }
         if(contact_number != ticket.contact_number && contact_number != ''){
             console.log('contact_number updated')
         }else{
             console.log('contact_number not updated')
         }
         if(time_zone != ticket.time_zone && time_zone != ''){
             console.log('time_zone updated')
         }
         else{
             console.log('time_zone not updated')
         }
    }
}

async function viewTicketBasedOn (key,value){ // 

    const sqlQuery = `SELECT * FROM ticket WHERE ${key}=?`

    let ticket = await db.query (sqlQuery,[value])
    console.log(ticket)
}


module.exports = {getTickets,getOneTicket,createOneTicket,updateTicket,viewTicketBasedOn}