const mongoClient = require ('mongodb').MongoClient

const state={
    mdb:null
}

module.exports.connect =  function(done){
    const url=`mongodb://localhost:27017`
    const dbname = 'service_desk'

    mongoClient.connect(url,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            state.mdb = data.db(dbname)
            done()
        }
    })
}

module.exports.get = function(){
    return state.mdb
}