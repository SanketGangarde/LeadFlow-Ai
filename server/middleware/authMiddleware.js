/**
 * Middleware to verify that the request is authenticated by Passport.
 * Returns 401 Unauthorized if not logged in.
 */
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized. Admin login required.' });
};

module.exports = { ensureAuthenticated };
