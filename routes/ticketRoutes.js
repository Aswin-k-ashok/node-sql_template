const express = require ('express');
const router = express.Router();
const tickets = require('../services/tickets');

router.get('/',async function(req,res,next){
    try{
        res.json(await tickets.getTickets(req.query.page));
    }catch(err){
        console.error('error in get tickets',err);
        next(err)
    }
})

module.exports = router;