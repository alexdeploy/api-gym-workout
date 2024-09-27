const jwt = require('jsonwebtoken');

const userService = require('../services/auth/user.service');

module.exports = {
  authenticateRole: async (req, res, next) => {
    try {

      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ success: false, error: 'Token is not supplied' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userService.getUser(decoded.userId);

      if (!user) {
        return res.status(401).json({ success: false, error: 'User not found' });
      }
      
      req.user = user;

      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, error: 'Auth token is not valid' });
      } else {
        return res.status(500).json({ success: false, error: 'Error while authenticating user' });
      }
    }
  },
};