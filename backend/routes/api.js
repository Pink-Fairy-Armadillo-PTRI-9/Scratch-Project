const express = require("express");

const dbController = require("../controllers/dbController");

const router = express.Router();

router.post("/", dbController.getLandord, (req, res) =>
  res.json(res.locals.landLord)
);

router.post("/login", (req, res) => res.status(200).json(res.locals.users));

router.post("/signup", dbController.createUsers);

module.exports = router;
