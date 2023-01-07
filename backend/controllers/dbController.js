const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const dbController = {};

dbController.getLandord = (req, res, next) => {
  const text = "SELECT * FROM landlords WHERE name = $1";
  const value = [req.body.name];
  db.query(text, value)
    .then((data) => {
      res.locals.landLord = data.rows[0];
      next();
    })
    .catch((err) => next(err));
};

dbController.createUsers = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const text = "INSERT INTO users VALUES (6,$1,$2,$3,true)";

  const value = [username, email, hashedPassword];

  db.query(text, value)
    .then((data) => res.json("user created"))
    .catch((err) => next(err));
};

dbController.getUsers = (req, res, next) => {
  const { email, password } = req.body;
  const text = "SELECT * FROM users WHERE name = $1";
  const value = [email, password];
  db.query(text, value)
    .then((data) => {
      res.locals.users = data.rows[0];
      next();
    })
    .catch((err) => next(err));
};

module.exports = dbController;
