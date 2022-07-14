const db = require('../services/db')
const helper = require('../helper')
const config = require('../config')

//desc board create
async function createNewBoard (data){
    const sqlQuery = `INSERT INTO service_desk.board (board_number,board_name) VALUES (?,?)`
    const row = await db.query(sqlQuery,[data.board_number,data.board_name])
    const newBoard = helper.emptyOrRows(row)
    console.log(newBoard)
    return newBoard
}

//desc board view
async function viewBoards (){
    const sqlQuery = 'SELECT * FROM board'
    const row = await db.query(sqlQuery)
    const boards = helper.emptyOrRows(row)
    return boards
}

//desc view a board
async function viewBoard (board_id){
    const sqlQuery = `SELECT * FROM board WHERE board_id = ${board_id}`
    const row = await db.query(sqlQuery)
    const board = helper.emptyOrRows(row)
    return board
}

//desc board edit
async function editBoard (board_id,data){
    let board = await viewBoard(board_id)
    board = board[0]
    if(data.board_name == board.board_name || data.board =='' || data.board == undefined){
        console.log('no change')
    }else{
        board.board_name = data.board_name
        console.log(board)
    }
    if(data.board_name == board.board_name || data.board=='' || data.board == undefined){
        console.log('no change')
    }else{
        board.board_number = data.board_number
    }

    const sqlQuery = `UPDATE service_desk.board SET board_number = ?, board_name = ? WHERE (board_id = ?)`

    const row = db.query(sqlQuery,[board.board_name,board.board_number,board_id])
    const editedBoard = helper.emptyOrRows(row)
    console.log(board)
    return editedBoard
}

//desc board delete
async function deleteBoard(board_id){
    const sqlQuery = `DELETE FROM board WHERE board_id=?`
    const row = db.query(sqlQuery,[board_id])
    return row
}

module.exports = {createNewBoard,viewBoards,viewBoard ,editBoard,deleteBoard}