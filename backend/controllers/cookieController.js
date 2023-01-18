const cookieController = {};
/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie("ssid", res.locals.id, { maxAge: 10 * 86400000, httpOnly: true });
  next();
};

module.exports = cookieController;
