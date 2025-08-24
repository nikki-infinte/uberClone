const mongoose = require('mongoose');

connectToDb = ()=>{
   mongoose.connect(process.env.DB_CONNECT, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   }).then(() => {
       console.log('Connected to MongoDB');
   }).catch(err => console.log("Error it is " + err));
}
module.exports = connectToDb;