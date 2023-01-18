const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");

const app = express();
const apiRouter = require("./routes/api");
//need for parsing the body of the request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, "../frontend")));

app.use("/api", apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("Page not found, please check your URL endpoints!")
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
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
