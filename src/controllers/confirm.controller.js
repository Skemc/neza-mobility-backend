// import jwt from 'jsonwebtoken';
// import UserServices from '../services/emailVerification.services';
// import Response from '../utils/response';

// class ConfirmController {
//   /**
//    * It activate a user account by updating isVerified attribute to true
//    * @param {int} req This is the parameter(user id) that will be passed in url
//    * @param {object} res This is a response will be send to the user
//    * @returns {object} return object which include status and message
//    */
//   static async verifyingUsers(req, res) {
//     const { email } = jwt.verify(req.params.emailToken, process.env.KEY);
//     const token = req.params.emailToken;
//     const verify = true;
//     const verifyUser = await UserServices.verifyingUser(email, verify, token);

//     if (verifyUser.status === 200) {
//       const response = new Response(res, 200, verifyUser.message, verifyUser.data);
//       response.sendSuccessResponse();
//     } else {
//       const response = new Response(res, verifyUser.status, verifyUser.message);
//       response.sendErrorMessage();
//     }
//   }
// }

// export default ConfirmController;
