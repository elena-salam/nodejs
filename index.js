const mongoose = require('mongoose');
const express = require('express');

// const morgan = require('morgan');
// const cors = require('cors');
const userRouter = require("./routers/contactsRouter.js")
const app = express();
app.use(express.json());
// app.use(cors());
// app.use(morgan("dev"));
app.use("/api/contacts", userRouter);
// app.use(express.json());
// app.use('/api/users', router);
// const url = "mongodb+srv://new-user_1:123@cluster0.a68ia.mongodb.net/db-contacts?retryWrites=true&w=majority"
app.use((error, req, res, next) => {
  res.status(500).json({message: error.message});
})

async function start(){
  try{
    require('dotenv').config()
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  });
  
      
    app.listen(process.env.PORT);
    console.log("Database connection successful");
    
  } catch(err) {
    console.log('error:', err);
    process.exit(1)
  }
  
}
start();
