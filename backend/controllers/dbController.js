const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const dbController = {};

dbController.getAll = (req, res, next) => {
  const text = "SELECT * FROM landlords";

  db.query(text)
    .then(async data => {
      const queryText =
        "SELECT AVG(rating) FROM reviews where landlord_id = $1;";
      const landLords = data.rows;
      //this loop is to query each landlord's review and find the average of all their ratings
      for (const person of landLords) {
        const value = [person._id];
        const average = (await db.query(queryText, value)).rows[0].avg;
        //delcare a new property name averageRating in each landlord object and assign the average found
        average === null
          ? (person.averageRating = null)
          : (person.averageRating = Number.parseFloat(average).toFixed(1));
      }
      res.status(200).json(landLords);
    })
    .catch(err =>
      next({
        log: "error caught in getAll middleware!",
        status: 400,
        message: { err: err },
      })
    );
};

dbController.createLandlord = (req, res, next) => {
  const { location, name } = req.body;
  const text =
    "INSERT INTO landlords(name, location) VALUES ($1,$2) RETURNING _id, name, location";

  const value = [name, location];
  db.query(text, value)
    .then(data => res.json(data.rows[0]))
    .catch(err =>
      next({
        log: "error caught in createLandLord middleware!",
        status: 400,
        message: { err: err },
      })
    );
};

dbController.getLandLord = (req, res, next) => {
  const text =
    // "select landlords.name, landlords.location, reviews.rating, reviews.would_rent_again, reviews.landlord_id as _id from reviews right join landlords ON landlords._id = $1 AND reviews.landlord_id = $1";
    "SELECT landlords.name, landlords.location, reviews.rating, reviews.would_rent_again, reviews.landlord_id AS _id FROM landlords LEFT JOIN reviews ON landlords._id =  reviews.landlord_id WHERE landlords._id = $1";
  const landlord = req.params.id;
  console.log(landlord);
  const value = [landlord];
  db.query(text, value)
    .then(data => {
      //redirect to landlord submission page if landlord is not found
      console.log(data.rows);
      if (!data.rows[0]) return res.json("landlord not in database");
      // ratings is the average of all the ratings from all reviews
      // rentAgain is the average of 1s and 0s from the would_rent_again column in all reviews
      const ratings = average(data.rows.map(el => el["rating"]));
      const rentAgain = average(data.rows.map(el => el["would_rent_again"]));
      data.rows[0]["rating"] = Number.parseFloat(ratings).toFixed(1);
      data.rows[0]["would_rent_again"] = `${rentAgain * 100}%`;
      //pass the landlord card with name of landlord and the average ratings
      res.locals.landLord = data.rows[0];
      next();
    })
    .catch(err =>
      next({
        log: "error caught in getLandLord middleware!",
        status: 400,
        message: { err: err },
      })
    );
};

dbController.createUsers = async (req, res, next) => {
  const { username, email, password } = req.body;

  db.query(`SELECT * FROM users where email = '${email}'`)
    .then(data => {
      if (data.rows[0] !== undefined)
        return res.status(400).json({ error: "email has already been used" });
    })
    .catch(err =>
      next({
        log: "error caught in createUsers middleware while checking the existence of the account in the database!",
        status: 400,
        message: { err: err },
      })
    );

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const text = "INSERT INTO users(username,email,password) VALUES ($1,$2,$3)";

  const value = [username, email, hashedPassword];

  db.query(text, value)
    .then(_ => res.status(200).json("user created"))
    .catch(err =>
      next({
        log: "error caught in createUsers middleware while trying to insert new user data into database!",
        status: 400,
        message: { err: err },
      })
    );
};

dbController.getUsers = async (req, res, next) => {
  const { email, password } = req.body;
  const text = "SELECT * FROM users WHERE email = $1";
  const value = [email];

  const user = (await db.query(text, value)).rows[0];

  try {
    if (user && (await bcrypt.compare(password, user.password))) {
      //pass the web token to the next middleware to set it as a cookie for session control
      res.locals.id = generateToken({ id: user._id, username: user.username });
      next();
    } else {
      res.json("email or password incorrect");
    }
  } catch (err) {
    next({
      log: "error caught in getUsers middleware!",
      status: 400,
      message: { err: err },
    });
  }
};

dbController.postReviews = (req, res, next) => {
  const { userId } = res.locals.user;
  const { landlord_id, text, rating, would_rent_again, date } = req.body;
  const queryText =
    "INSERT INTO reviews (landlord_id, text, rating, would_rent_again, date, user_id) values($1,$2,$3,$4,$5,$6)";
  const value = [landlord_id, text, rating, would_rent_again, date, userId];

  db.query(queryText, value)
    .then(_ => res.status(200).json("review posted"))
    .catch(err =>
      next({
        log: "error caught in postReviews middleware!",
        status: 400,
        message: { err: err },
      })
    );
};

dbController.getReviews = (req, res, next) => {
  const text =
    "SELECT reviews.*, users.username AS user FROM reviews INNER JOIN users ON reviews.user_id = users._id AND reviews.landlord_id = $1";
  const value = [res.locals.landLord._id];
  db.query(text, value)
    .then(data => {
      res.locals.reviews = data.rows;
      next();
    })
    .catch(err =>
      next({
        log: "error caught in getReviews middleware!",
        status: 400,
        message: { err: err },
      })
    );
};

function average(arr) {
  const sum = arr.reduce((acc, cur) => acc + cur, 0);
  return sum / arr.length;
}

function generateToken(id) {
  return jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
module.exports = dbController;
