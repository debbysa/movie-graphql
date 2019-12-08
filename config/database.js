const mongoose = require("mongoose");

//connect to mongoDB
mongoose
  .connect(
    "mongodb+srv://root:root@cluster0-1klu4.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("connected"))
  .catch(err => console.log("err = " + err));
