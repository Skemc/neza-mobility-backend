// /* eslint-disable valid-jsdoc */
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// import style from './style';

// dotenv.config();

// class Mailer {
//   /**
//     * Malier class constructor
//     * @param {Object} mailObject - the mailer Object
//     * @param {String} mailObject.to - the user the email should go to
//     * @param {String} mailObject.message - the message to be sent to the user
//     * @param {Boolean} mailObject.iButton - to add a button
//     * @static
//     */
//   constructor(mailObject) {
//     const {
//       to, header, messageHeader, messageBody, Button, optionLink
//     } = mailObject;
//     this.to = to;
//     this.header = header || 'Welcome to Neza Mobility';
//     this.messageHeader = messageHeader;
//     this.messageBody = messageBody;
//     this.optionLink = optionLink;
//     this.Button = Button || false;
//   }

//   /**
//    * Email trasporter
//    * @param {String} to - Reciever email
//    * @param {String} from - Sender email
//    * @param {String} subject - Email subject
//    * @param {String} html - Email body
//    * @returns  {Object} - Mailer response
//    */
//   async sendMail() {
//     const html = `
//       <!DOCTYPE html>
//       <html lang="en">
//         <head>
//           <meta charset="UTF-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//           <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//           <style>
//             ${style}
//           </style>
//         </head>
//         <body>
//         <div class="container">
//         <div class="content">
//             <div style="padding:30px 30px 29px;margin: 0px auto;">
//               <div style="position: relative; top: -30px">
//                 <img src="https://res.cloudinary.com/skemc/image/upload/v1580379073/bare_mdik8n.png" />
//               </div>
//               <p><span class="welcome">${this.header}</span></p>
//               <ul>
//                 <li>${this.messageHeader}</li>
//                 <li style="">Welcome to Neza Mobility!</span></li>
//                 <li class="message">${this.messageBody}</li>
//               </ul>
//               ${this.Button ? this.buttonTemp : ''}
//               <ol>
//                 <li class="copy">If that doesn't work, copy and paste this link into your browser</li>
//                 <li><a href="${this.optionLink}">${this.optionLink}</a></li>
//               </ol>
//               <div class="regard"><ul>
//                 <li><strong>Regards,</strong></li><br>
//                 <li>Neza Mobility Team</li>
//               </ul>
//             </div>
//             </div>
//         </div>
//         <br/>
       
//       <div align="center" class="social-media">
//         <ol>
//           <li><a href="#" id="facebook"><img src="https://res.cloudinary.com/kemmy/image/upload/v1583168846/icons/facebook_sobhp7.png"></a></li>
//           <li><a href="#" id="twitter"><img src="https://res.cloudinary.com/kemmy/image/upload/v1583168845/icons/twitter_wpject.png"></a></li>
//           <li><a href="#" id="linkedin"><img src="https://res.cloudinary.com/kemmy/image/upload/v1583168845/icons/linkedin_y1r8sh.png"></a></li>
//            <li><a href="#" id="google"><img src="https://res.cloudinary.com/kemmy/image/upload/v1583168846/icons/google_xwwx48.png"></a></li>
//           <li><a href="#" id="instagram"><img src="https://res.cloudinary.com/kemmy/image/upload/v1583168846/icons/instagram_g1qfoc.png"></a></li>
//           <li><a href="#" id="youtube"><img src="https://res.cloudinary.com/kemmy/image/upload/v1583168847/icons/youtube_ij1qbb.png"></a></li>
//         </ol>
//       </div> <br>
//       <center>  
//           <div align="center" class="footer_text">
//         <p>You are receiving this email because it may contain important information to you. <br> If you want to stop getting emails from Barefoot Nomad click the link below</p>
//         <p><b>Unsubscribe your email</b></p>
//       </div>
//       </center>
//     </div>
//         </body>
//       </html>
//   `;
//     try {
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL,
//           pass: process.env.PASSWORD
//         }
//       });

//       const messageObj = {
//         from: `Neza Mobility ${process.env.EMAIL}`,
//         to: this.to,
//         subject: this.header,
//         html
//       };

//       await transporter.sendMail(messageObj);
//       transporter.close();
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   /**
//    * Sets the email Header
//    * @param {String} header - The header of the mail
//    * @returns {null} - dosen't return an object
//    */
//   setHeader(header) {
//     this.header = header;
//   }

//   /**
//    * Intializes the button
//    * @param {string} button.text - The text in the button
//    * @param {string} button.link - The url of the mail
//    * @returns {null} - dosen't return an object
//    */
//   InitButton(button) {
//     const { text, link } = button;
//     this.buttonTemp = `
//       <div style="margin: 30px;">
//         <a class='link-button' href = '${link}' style="color: white">${text}</a>
//       </div>
//     `;
//   }
// }

// export default Mailer;
