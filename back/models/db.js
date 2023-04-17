const mongoose = require('mongoose');
module.exports=mongoose
    .connect('mongodb://localhost:27017/mydb',{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("connect to mongodb database"))
    .catch((err) => console.log(err))

    // useCreateIndex:true  no suport
