const express = require('express')
const app = express()
const port = 5000
const ticktRouter = require('./routes/ticketRoutes')

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/tickets', ticktRouter);

app.use((err,req,res,next)=>{
  const stausCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(stausCode).json({message:err.message})
  return;
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})