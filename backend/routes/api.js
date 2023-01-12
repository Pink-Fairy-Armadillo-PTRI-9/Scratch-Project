const express = require("express");

const dbController = require("../controllers/dbController");
const cookieController = require("../controllers/cookieController");

const router = express.Router();

router.get("/getall", dbController.getAll);

router.get(
  "/getlandlord/:id",
  dbController.getLandLord,
  dbController.getReviews,
  (req, res) =>
    res.status(200).json({
      landlord: res.locals.landLord,
      reviews: res.locals.reviews,
    })
);

router.post("/createlandlord", dbController.createLandlord);

router.post(
  "/login",
  dbController.getUsers,
  cookieController.setSSIDCookie,
  (req, res) => res.json("user authenicated!")
);

router.post("/signup", dbController.createUsers);

router.post("/postReviews", dbController.postReviews);

module.exports = router;
