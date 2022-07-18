const express = require ('express');
const router = express.Router();
// const tickets = require('../services/tickets');
const tickets = require('../controllers/ticketControllers')

//@desc : get all tickets
router.get('/',async function(req,res,next){
    try{
        res.json(await tickets.getAllTickets());
    }catch(err){
        console.error('error in get tickets',err);
        next(err)
    }
})

//@desc : create a ticket
router.post('/',async function(req,res,next){
    const ticket= req.body
    try{
        res.json(await tickets.newTicket(ticket))
    }catch(err){
        console.error('error in post ticket',err);
        next(err)
    }
})

//@desc : get a ticket
router.get('/:id',async function(req,res,next){
    try{
        res.json(await tickets.getTicket(req.params.id))
    }catch(err){
        console.log(err)
        next(err)
    }
})

//@desc : update a ticket
router.patch('/:id',async function(req,res,next){
    const ticket_data= req.body
    const ticket_id = req.params.id
    try{
        res.json(await tickets.updateTicket(ticket_id,ticket_data))
    }catch(err){
        console.error('error in updating ticket',err);
        next(err)
    }
})

//@desc :link existing ticket as an child ticket
router.patch('/child/:id',async function(req,res,next){
    const ticket_data = req.body
    const ticket_id = req.params.id
    try{
        res.json(await tickets.linkExistingTicket(ticket_id,ticket_data))
    }catch(err){
        console.error('error in linking ticket',err);
        next(err)
    }
})

//@desc : create a child ticket
router.post('/child',async function(req,res,next){
    const ticket_data = req.body
    try{
        res.json(await tickets.newChildTicket(ticket_data))
    }catch(err){
        console.error('error in creating child ticket',err);
        next(err)
    }

})

//@desc : get all tickets based on filter
router.get('/filter/:filter/:filterType',async function(req,res,next){
    const filter = req.params.filter
    const filterType = req.params.filterType
    try{
        res.json(await tickets.viewTicketBasedOnFilter(filter,filterType))
    }catch(err){
        console.error('error in getting tickets based on filter',err);
        next(err)
    }
})

//@desc : reply to a ticket

router.post('/chat/reply',async function(req,res,next){
    
})


router.post('/mongo',async function(req,res,next){
    try{
        res.json(await tickets.mongoTest(req.body))
    }catch(err){
        console.log(err)
        next(err)
    }
})


 module.exports = router;