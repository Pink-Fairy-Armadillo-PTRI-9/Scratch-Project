const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;

const app = express();
const apiRouter = require("./routes/api");
//need for parsing the body of the request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, "../frontend")));

app.use("/api", apiRouter);
// respond with the index.html when a GET request is made to the homepage
// app.get("/", (req, res) => {
//   res.sendFile("./index.html");
// });

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);
/**
 * express error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
