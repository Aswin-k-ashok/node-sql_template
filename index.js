const express = require('express')
const app = express()
const port = 5000
const ticktRouter = require('./routes/ticketRoutes')
const boardRouter = require('./routes/boardRoutes')
const mdb = require('./services/mongodb')


app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

mdb.connect((err)=>{
  if(err){
    console.log("connection error")
  }else{
    console.log("data base connected successfully")
  }
})

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/tickets', ticktRouter);
app.use('/board', boardRouter);

app.use((err,req,res,next)=>{
  const stausCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(stausCode).json({message:err.message})
  return;
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})