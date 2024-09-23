const jwt = require('jsonwebtoken');
const roles = require('../config/roles.config');

module.exports = {
/*   authenticateUser: async (req, res, next) => {
    try {

      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ success: false, error: 'Token is not supplied' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userService.getUserById(decoded.userId);

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
  }, */
  authenticateRole: async (req, res, next) => {
    try {
/*         const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
          return res.status(401).json({ success: false, error: 'Token is not supplied' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken.role) {
          return res.status(401).json({ success: false, error: 'Not role provided' });
        } */

        // TODO: Check if the role exists on DB.

        // req.user = decodedToken;
        const role = req.headers['role'];
        const userId = req.headers['userId'];
        req.user = {
          userId: userId,
          role: role
        };

        next();

    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error while authenticating role' });
    }
    }
};