import nodemailer from 'nodemailer';
import config from '../config/config';
import logger from '../config/logger';

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((error) =>
      logger.warn('Unable to connect to email server.', error),
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    text,
  };
  await transport.sendMail(msg);
};

/**
 *
 * @param {String} to
 * @param {String} token
 * @returns {Promise}
 */
const sendConfirmEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const confirmUrl = `http://localhost:3000/api/auth/confirm/?token=${token}`;
  const text = `Verify your email
  
  Thank you for choosing PickitApp. 
  
  Please confirm that ${to} is your email address by clicking on the button below or use this link: ${confirmUrl}`;
  await sendEmail(to, subject, text);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://localhost:3000/api/auth/reset-password/${token}`;
  const text = `Dear user,

  To reset your password, click on this link: ${resetPasswordUrl}
  
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

export default {
  transport,
  sendEmail,
  sendConfirmEmail,
  sendResetPasswordEmail,
};
