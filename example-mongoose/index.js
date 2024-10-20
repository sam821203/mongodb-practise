const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://raystyle32613:6DDEnXxO644oOweU@cluster0.ujl1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB..."));
