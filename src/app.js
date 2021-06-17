const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("../router/userRouter");
const TodoRouter = require("../router/todoRouter");
const app = express();
app.use(express.json());
app.use("/user", UserRouter);
//hello there
app.use("/todo", TodoRouter);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  res.status(status).json({
    message,
  });
});
mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((e) => {
    console.log(e);
  })
