const express = require ('express');
const router = express.Router();
const board = require('../controllers/boardControllers')

router.post('/',async function(req,res,next){
    try{
        res.json(await board.createNewBoard(req.body))
    }catch(err){
        console.error('error in board board creation')
        next(err)
    }
})

router.get('/',async function(req,res,next){
    try {
        res.json(await board.viewBoards())
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.get('/:id',async function(req,res,next){
    const board_id = req.params.id
    try{
        res.json(await board.viewBoard(board_id))
    }catch(error){
        console.error(error)
        next(error)
    }
})

router.patch('/:id',async function(req,res,next){
    const board_id = req.params.id
    const data = req.body
    try {
        res.json(await board.editBoard(board_id,data))
    }catch(error){
        console.error(error)
        next(error)
    }
})

router.delete('/:id',async function(req,res,next){
    const board_id = req.params.id
    try{
        res.json(await board.deleteBoard(board_id))
    }catch(err){
        console.log(err)
        next(err)
    }
})


module.exports = router;