// const { OAuth2Client } = require("google-auth-library");
// const jwt = require("jsonwebtoken");
// const { User } = require("../models");

// const googleClient = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID
// );

// const googleLogin = async (req, res) => {
//   try {
//     const { credential } = req.body;

//     if (!credential) {
//       return res.status(400).json({
//         success: false,
//         message: "Google credential is required",
//       });
//     }

//     // Verify Google credential
//     const ticket = await googleClient.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     const {
//       sub: googleId,
//       email,
//       name,
//       picture,
//       email_verified,
//     } = payload;

//     if (!email_verified) {
//       return res.status(401).json({
//         success: false,
//         message: "Google email is not verified",
//       });
//     }

//     // Find existing user
//     let user = await User.findOne({
//       where: {
//         email,
//       },
//     });

//     // Create user if doesn't exist
//     if (!user) {
//       let username =
//         email
//           .split("@")[0]
//           .replace(/[^a-zA-Z0-9_]/g, "")
//           .toLowerCase();

//       // Make username unique
//       const existingUsername =
//         await User.findOne({
//           where: {
//             username,
//           },
//         });

//       if (existingUsername) {
//         username = `${username}_${Date.now()}`;
//       }

//       user = await User.create({
//         username,
//         email,
//         password: null,
//         fullName: name || username,
//         profileImage: picture || "",
//       });
//     }

//     // Generate your SnapGrid JWT
//     const token = jwt.sign(
//       {
//         id: user.id,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Google login successful",
//       token,
//       user,
//     });
//   } catch (error) {
//     console.error(
//       "Google Login Error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Google authentication failed",
//     });
//   }
// };

// module.exports = {
//   googleLogin,
// };