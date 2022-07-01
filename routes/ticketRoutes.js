const express = require ('express');
const router = express.Router();
const tickets = require('../services/tickets');

router.get('/',async function(req,res,next){
    try{
        console.log(await tickets.getTickets());
        
        res.json(await tickets.getTickets());
    }catch(err){
        console.error('error in get tickets',err);
        next(err)
    }
})

router.get('/:id',async function(req,res,next){
    console.log(req.params.id);
    try{
        console.log(await tickets.getOneTicket(req.params.id));
        const all_tickets = await tickets.getTickets()
        console.log(all_tickets,'all_tickets');
        res.json(await tickets.getOneTicket(req.params.id));
    }catch(err){
        console.error('error in get tickets',err);
        next(err)
    }
})

module.exports = router;