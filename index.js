const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require("./routers/contactsRouter.js")


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.use("/api/contacts", userRouter);

app.listen(PORT, ()=>{
  console.log(`Server works on port ${PORT}`);
})


