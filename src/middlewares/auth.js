import { tokenService, userService } from '../services';
import APIError from '../utils/APIError';
// const { roleRights } = require('../config/roles');

// const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
//   if (err || info || !user) {
//     return reject(new APIError(401, 'Please authenticate'));
//   }
//   req.user = user;

//   if (requiredRights.length) {
//     const userRights = roleRights.get(user.role);
//     const hasRequiredRights = requiredRights
//       .every((requiredRight) => userRights.includes(requiredRight));
//     if (!hasRequiredRights && req.params.userId !== user.id) {
//       return reject(new APIError(403, 'Forbidden'));
//     }
//   }

//   resolve();
// };

// const auth = (...requiredRights) => async (req, res, next) => new Promise((resolve, reject) => {
//   passport.authenticate('jwt', { session: false },
//   verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
// })
//   .then(() => next())
//   .catch((err) => next(err));

const auth = async (req, res, next) => {
  try {
    const token = !req.headers.token
      ? req.query.token.split(' ')[1]
      : req.headers.token.split(' ')[1];

    if (!token) {
      next(new APIError(403, 'No token provided'));
    }

    const payload = await tokenService.verifyToken(token);
    console.log(payload);
    const user = await userService.getUserById(payload.sub);

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    next(new APIError(401, 'Invalid token'));
  }
};

export default auth;
