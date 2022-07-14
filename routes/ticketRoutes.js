const express = require ('express');
const router = express.Router();
// const tickets = require('../services/tickets');
const tickets = require('../controllers/ticketControllers')

router.get('/',async function(req,res,next){
    try{
        res.json(await tickets.getAllTickets());
    }catch(err){
        console.error('error in get tickets',err);
        next(err)
    }
})

router.post('/',async function(req,res,next){
    const ticket= req.body
    try{
        res.json(await tickets.newTicket(ticket))
    }catch(err){
        console.error('error in post ticket',err);
        next(err)
    }
})

router.get('/:id',async function(req,res,next){
    try{
        res.json(await tickets.getTicket(req.params.id))
    }catch(err){
        console.log(err)
        next(err)
    }
})

router.post('/mongo',async function(req,res,next){
    try{
        res.json(await tickets.mongoTest(req.body))
    }catch(err){
        console.log(err)
        next(err)
    }
})

// router.post('/',async function(req,res,next){
//     try{
//         const {summary,board,status,priority,sla_status,work_type,ticket_notes,ticet_type,contact_and_agreement,attachments,devices_and_assests,documents,checklist,billable,customer,user,site,email,contact_number,time_zone} = req.body;

//         const ticket_data = {summary,board,status,priority,sla_status,work_type,ticket_notes,ticet_type,contact_and_agreement,attachments,devices_and_assests,documents,checklist,billable,customer,user,site,email,contact_number,time_zone};

//         const ticket_gen = await tickets.createOneTicket(ticket_data);
//         console.log(ticket_gen);
//         res.send('dones')
//         // res.json({ticket_gen:ticket_gen, message:"ticket created successfully"});

//     }catch(err){
//         console.error('error in create ticket',err);
//         next(err)
//     }
// })

// router.get('/:id',async function(req,res,next){
//     console.log(req)
//     console.log(req.params.id);
//     try{
//         console.log(await tickets.getOneTicket(req.params.id));
//         const all_tickets = await tickets.getTickets()
//         console.log(all_tickets,'all_tickets');
//         res.json(await tickets.getOneTicket(req.params.id));
//     }catch(err){
//         console.error('error in get tickets',err);
//         next(err)
//     }
// })

// router.patch('/:id',async function(req,res,next){
//     const ticketDataFromBody = req.body;
//     try{
//      await tickets.updateTicket(req.params.id,ticketDataFromBody);
//     }catch(err){
//         console.error(err)
//     }
// })

// router.post('/filterTicket/:filter', async function(req,res,next){
//    const key = req.params.filter
//    const value = req.body.value
//    console.log(key)
//    console.log(value)
//     try{
//         await tickets.viewTicketBasedOn(key,value);
//     }catch(err){
//         console.log(err)
//     }
// })

 module.exports = router;