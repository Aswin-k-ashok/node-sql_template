const db = require('./db')
const helper = require('../helper')
const config = require('../config')
let colors = require('colors/safe') 

//@ desc : get all tickets and request

async function getAllTickets (){
    const tickets = db.query('select * from ticket')
    return tickets
}

//@ desc : new ticket
//@ desc : accept a ticket
//@ desc : view ticket based on board
//@ desc : reply a ticket by adding notes
//@ desc : add additional details 
//@ desc : forward / escalate a ticket
//@ desc : merge ticket
//@ desc : view ticket based on filters
//@ desc : updating tickets in bulk
//@ desc : child ticket option
//@ desc : link existing ticket
//@ desc : new child ticket
//@ desc : attribute create
//@ desc : attribute read 
//@ desc : attribute update
//@ desc : attribute delete
//@ desc : task scheduling
//@ desc : assets & devices create
//@ desc : assets & devices read
//@ desc : assets & devices update
//@ desc : assets & devices delete
//@ desc : doucument uploading
//@ desc : documents adding , adding KB based doucment to the ticket
//@ desc : adding files to attachment
//@ desc : add ticket into the queue
//@ desc : remove ticket from queue
 

module.exports = {}