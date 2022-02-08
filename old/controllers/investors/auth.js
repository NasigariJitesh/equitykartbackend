const { default: axios } = require("axios");
//const Service = require('../../lib/CircuitBreaker')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { saltRounds, jwt_key, expiry } = require("../../config/environment");
const User = require("../../models/user");
const Error = require("../../config/error");
const transporter = require("../../config/nodemailer");
const crypto = require("crypto");

module.exports.signUp = async (req, res) => {
  try {
    const { email, password, firstname, lastname, phone, role } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      // if(!user.verified)
      //     // TODO : change error
      //     return res.status(409).json({
      //         message: 'You have signedUp already! Please user your account or Log In'
      //     })
      return res.status(409).json({
        message: Error[409]("Email"),
      });
    }
    let salt = await bcrypt.genSalt(saltRounds);
    let randomBytes = await crypto.randomBytes(20).toString("hex");
    let passwordHash = await bcrypt.hash(password, salt);
    user = await User.create({
      email: email,
      password: passwordHash,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      role: role,
      token: randomBytes,
    });
    let url = `<a href="http://${req.headers.host}/verify/${randomBytes}">user</a>`;
    console.log(url);

    let token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        email: user.email,
      },
      jwt_key,
      { expiresIn: expiry }
    );

    // TODO : NODEMAILER to send email
    transporter
      .sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Email Verification ", // Subject line
        text: "Verify email ", // plain text body
        html: url, // html body
      })
      .then((data) => {
        console.log(data);
        console.log("Mail sent successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    return res.status(200).json({
      message: "SignedUp successfully",
      token: token,
    });
  } catch (error) {
    console.log(`Error encountered while signUp (investor) : ${error}`);
    return res.status(500).json({
      message: Error[500](),
    });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    let { email, password, role } = req.body;
    let user = await User.findOne({
      $and: [{ email: email }, { role: role }],
    });
    if (!user) return res.status(404).json({ message: Error[404]("User") });
    let result = await bcrypt.compare(password, user.password);
    if (!result) return res.status(401).json({ message: Error[401]() });
    let token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        email: user.email,
      },
      jwt_key,
      { expiresIn: expiry }
    );
    return res.status(200).json({
      message: `SignedIn Successfully `,
      token: token,
    });
  } catch (error) {
    console.log(`Error inside signIn (investor) : ${error}`);
    return res.status(500).json({
      message: Error[500](),
    });
  }
};

module.exports.verify = async (req, res) => {
  try {
    let user = await User.find({ token: req.params.token });
    if (!user) {
      return res.status(404).json({
        message: Error[404](),
      });
    }
    user = await User.findByIdAndUpdate(user._id, { verified: true });
    console.log(user);
    return res.status(200).json({
      message: "User Verified",
    });
  } catch (error) {
    console.log(`Error inside user (investor) : ${error}`);
    return res.status(500).json({
      message: Error[500](),
    });
  }
};

// module.exports.request_access = async (req, res) => {
//     try{
//         const { orgId } = req.params
//         const service = new Service()
//         console.log('*******************************************')
//         const {ip , port , name } = await service.getService('investor-service')
//         console.log('inside requestAccess controller ')
//         console.log(`http://${ip}:${port}/user/requestAccess`)
//         let result =  await service.callService({
//             method: 'post',
//             url: `http://${ip}:${port}/user/requestAccess`,
//             data: {
//                 body: orgId,
//                 user: req.user
//             },
//         });
//         console.log(result)
//         return res.json(result);
//     }catch(error){
//         console.log(`Error inside user (investor) : ${error}`)
//         return res.status(500).json({
//             message: Error[500]()
//         })
//     }
// }

// module.exports.accessToOrg = async (req, res) => {
//     // const {id} = req.query
//     try{
//         const {limit , skip } = req.query
//         console.log(req.query)
//         const service = new Service()
//         const {ip , port } = await service.getService('investor-service')
//         console.log(ip , port)
//         let result = await service.callService({
//             method: 'get',
//             url: `http://${ip}:${port}/user?id=${req.user._id}&limit=${limit}&skip=${skip}`
//         })
//         console.log(result)
//         return res.status(200).json(result)
//     }catch(error){
//         console.log(`Error inside user (investor) : ${error}`)
//         return res.status(500).json({
//             message: Error[500]()
//         })
//     }
// }

// module.exports.removeAccess = async( req, res) => {
//     try{
//         const {orgId} = req.params
//         const service = new Service()
//         const {ip ,port} = await service.getService('investor-service')
//         console.log('inside remove access')
//         let result = await service.callService({
//             method: 'post',
//             url: `http://${ip}:${port}/user/removeAccess`,
//             data: {
//                 body: orgId,
//                 user: req.user
//             }
//         })
//         return res.status(200).json(result)
//     }catch(error){
//         console.log(`Error inside user (investor) : ${error}`)
//         return res.status(500).json({
//             message: Error[500]()
//         })
//     }
// }
