const db = require('./db')
const helper = require('../helper')
const config = require('../config')
let colors = require('colors/safe')

const warning = '\x1b[33m%s\x1b[0m'
const info = '\x1b[34m%s\x1b[0m'

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


module.exports = {getTickets,getOneTicket}