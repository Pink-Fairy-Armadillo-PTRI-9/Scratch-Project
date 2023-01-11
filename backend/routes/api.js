const express = require("express");

const dbController = require("../controllers/dbController");

const router = express.Router();

router.post(
  "/getlandlord",
  dbController.getLandord,
  dbController.getReviews,
  (req, res) =>
    res.status(200).json({
      landlord: res.locals.landLord,
      reviews: res.locals.reviews,
    })
);

router.post("/createlandlord", dbController.createLandlord);

router.post("/login", dbController.getUsers);

router.post("/signup", dbController.createUsers);

router.post("/postReviews", dbController.postReviews);

module.exports = router;
