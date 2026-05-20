const passport = require('passport');

/**
 * Log in the admin. Uses passport local authentication with custom callback for JSON response.
 */
const login = (req, res, next) => {
  passport.authenticate('local', (err, admin, info) => {
    if (err) {
      return next(err);
    }
    if (!admin) {
      return res.status(400).json({ error: info ? info.message : 'Invalid credentials' });
    }
    req.logIn(admin, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        message: 'Logged in successfully',
        admin: {
          id: admin._id,
          username: admin.username
        }
      });
    });
  })(req, res, next);
};

/**
 * Log out the admin user and destroy session.
 */
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // Destroy session explicitly to clean up session store
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid'); // Clear session cookie
      return res.status(200).json({ message: 'Logged out successfully' });
    });
  });
};

/**
 * Check the authentication status of the current session.
 */
const status = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      isAuthenticated: true,
      admin: {
        id: req.user._id,
        username: req.user.username
      }
    });
  }
  return res.status(200).json({ isAuthenticated: false });
};

module.exports = {
  login,
  logout,
  status
};
