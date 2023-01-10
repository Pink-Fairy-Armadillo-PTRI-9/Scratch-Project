const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// function generateWebToken (id) {
//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRY
//   });
// }

const dbController = {};

dbController.createLandlord = (req, res, next) => {
  const text = "INSERT INTO landlords(name) VALUES ($1)";

  const value = [req.body.name];
  db.query(text, value)
    .then((data) => res.json("Landlord created"))
    .catch((err) => next(err));
};

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
      res.json("user authenticated");
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
    "SELECT * FROM reviews INNER JOIN landlords ON landlords._id = $1";
  const value = [res.locals.landLord._id];
  db.query(text, value)
    .then((data) => {
      res.locals.reviews = data.rows;
      next();
    })
    .catch((err) => next(err));
};

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
