import wrap from '../utils/wrapAsync';
import {
  userService,
  authService,
  tokenService,
  emailService,
} from '../services';
import {
  customResponseWithData,
  successResponseWithData,
  successResponse,
  customResponse,
} from '../utils/response';

// import Mailer from '../services/mail/Mailer';


const register = wrap(async (req, res) => {
  const { email, firstName, lastName } = req.body;
  const user = await userService.createPassenger(req.body);
  const token = await tokenService.generateToken(user.id);
  await emailService.sendConfirmEmail(email, token);
  customResponseWithData(
    res,
    201,
    'User has been registered successfuly',
    { user, token },
  );


  // const mail = new Mailer({
  //   to: email,
  //   header: 'Verify your email address',
  //   messageHeader: `Hi, <strong>${firstName, lastName}!</strong>`,
  //   messageBody: 'Thank you for creating an account, Just click the link below to verify your account.',
  //   optionLink: `${process.env.FRONTEND_URL}/api/auth/confirmation/resend`,
  //   Button: true
  // });
  // mail.InitButton({
  //   text: 'Verify my account',
  //   link: `${process.env.FRONTEND_URL}/confirmEmail?token=${token}`
  // });
  // await mail.sendMail();
  // // const response = new Response(res, 201, 'User sucessfully registered', user);
  // // response.sendSuccessResponse();

  // customResponseWithData(
  //   res,
  //   201,
  //   'User has been registered successfuly',
  //   { user, token },
  // );

});

const login = wrap(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(
    email,
    password,
  );
  const token = await tokenService.generateToken(user.id);
  successResponseWithData(res, 'Logged in successfuly', {
    user,
    token,
  });
});

// const driverLogin = wrap(async (req, res) => {
//   const { driverID, busID, route } = req.body;
//   const user = await authService.loginDriverWithDriverIdAndBusIdAndRoute(
//     driverID,
//     busID,
//     route,

//   );
//   const tokens = await tokenService.generateToken(user.id);
//   successResponseWithData(res, 'Logged in successfuly', {
//     user,
//     tokens,
//   });
// });

const refreshTokens = wrap(async (req, res) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refreshAuth(refreshToken);
  successResponseWithData(res, 'Refreshed tokens successfuly', {
    tokens,
  });
});

const forgotPassword = wrap(async (req, res) => {
  const { email } = req.body;
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    email,
  );
  await emailService.sendResetPasswordEmail(
    email,
    resetPasswordToken,
  );
  successResponse(res, 'Reset password link was sent to your email');
});

const resetPassword = wrap(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  await authService.resetPassword(token, password);
  customResponse(
    res,
    204,
    'Your password has been reset successfuly',
  );
});

export default {
  register,
  login,
  // driverLogin,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
