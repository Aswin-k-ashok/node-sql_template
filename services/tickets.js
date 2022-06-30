const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function getTickets(page =1) {
    const offset = helper.getOffset(page,config.listPerPage);
    const rows = await db.query('SELECT * FROM ticket ', [config.listPerPage, offset]);
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
        data,meta
    }
}
module.exports = {getTickets}