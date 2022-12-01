const auth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect("/error");
      } else {
        next();
      }
}
module.exports = auth