const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const dbController = {};

dbController.getAll = (req, res, next) => {
  const text = "SELECT * FROM landlords";

  db.query(text)
    .then((data) => res.json(data.rows))
    .catch((err) => next(err));
};

dbController.createLandlord = (req, res, next) => {
  const { location, name } = req.body;
  const text = "INSERT INTO landlords(name, location) VALUES ($1,$2)";

  const value = [name, location];
  db.query(text, value)
    .then((data) => res.json("Landlord created"))
    .catch((err) => next(err));
};

dbController.getLandLord = (req, res, next) => {
  const text =
    "select landlords.name, reviews.rating, reviews.landlord_id as _id from reviews inner join landlords ON landlords.name = $1 AND reviews.landlord_id = landlords._id";
  const landlord = req.params.id.replace(
    req.params.id[0],
    req.params.id[0].toUpperCase()
  );
  const value = [landlord];
  db.query(text, value)
    .then((data) => {
      //redirect to landlord submission page if landlord is not found
      if (!data.rows[0]) return res.json("landlord not in database");
      // ratings is the average of all the ratings from all reviews
      const ratings = average(data.rows.map((el) => el["rating"]));
      data.rows[0]["rating"] = ratings;
      //pass the landlord card with name of landlord and the average ratings
      res.locals.landLord = data.rows[0];
      next();
    })
    .catch((err) => next(err));
};

dbController.createUsers = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const text = "INSERT INTO users(username,email,password) VALUES ($1,$2,$3)";

  const value = [username, email, hashedPassword];

  db.query(text, value)
    .then((data) => res.json("user created"))
    .catch((err) => next(err));
};

dbController.getUsers = async (req, res, next) => {
  const { email, password } = req.body;
  const text = "SELECT * FROM users WHERE email = $1";
  const value = [email];

  const user = (await db.query(text, value)).rows[0];

  try {
    if (user && (await bcrypt.compare(password, user.password))) {
      res.locals.id = generateToken({ id: user._id, username: user.username });
      next();
    } else {
      res.json("email or password incorrect");
    }
  } catch (err) {
    next(err);
  }
};

dbController.postReviews = (req, res, next) => {
  const { landlord_id, text, rating, would_rent_again, date, user_id } =
    req.body;
  const queryText =
    "INSERT INTO reviews (landlord_id, text, rating, would_rent_again, date, user_id) values($1,$2,$3,$4,$5,$6)";
  const value = [landlord_id, text, rating, would_rent_again, date, user_id];

  db.query(queryText, value)
    .then((data) => res.json("review posted"))
    .catch((err) => next(err));
};

dbController.getReviews = (req, res, next) => {
  const text =
    "SELECT reviews.*, users.username AS user FROM reviews INNER JOIN users ON reviews.user_id = users._id AND reviews.landlord_id = $1";
  const value = [res.locals.landLord._id];
  db.query(text, value)
    .then((data) => {
      res.locals.reviews = data.rows;
      next();
    })
    .catch((err) => next(err));
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

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email });
//     if (!user) return res.status(400).json({ msg: "User does not exist. " });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     delete user.password;
//     res.status(200).json({ token, user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
