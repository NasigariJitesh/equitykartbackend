const User = require('../models/user');
const CatchAsync = require('../utils/catchAsync.js')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError.js');
const { promisify } = require('util');

const signToken = (newUser, expiresIn) => {
    const { firstName, lastName, email, phone, role, id } = newUser
    const data = {
        firstName, lastName, email, phone, role, id
    }
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: expiresIn || process.env.JWT_EXPIRES_IN
    });
};

exports.signUp = CatchAsync(async (req, res, next) => {

    const newUser = await User.create({
        ...req.body,
        role: "Investor"
    });

    // const verificationCode = newUser.generateEmailVerificationCode();
    // console.log(verificationCode)
    // await new Email(newUser, ``).sendVerificationCode(verificationCode);
    //  await newUser.save();

    res.send({
        success: true,
        token: signToken(newUser)
    });

});

exports.signIn = CatchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // generate a token and send back response
    res.send({
        success: true,
        token: signToken(user)
    })

});

exports.protect = (byePass) => {

    return CatchAsync(async (req, res, next) => {
        // 1) Getting token and check of it's there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        } else if(byePass){
            return next()
        }

        if (!token && !byePass) {
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401)
            );
        }

        try {
            // 2) Verification token
            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

            // 3) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next(
                    new AppError(
                        'The user belonging to this token does no longer exist.',
                        401
                    )
                );
            }

            // GRANT ACCESS TO PROTECTED ROUTE
            req.user = currentUser;
        } catch(err) {
            if(err.name === 'JsonWebTokenError' && byePass){
                return next()
            } else {
                throw err
            }
        }
        next();
    })
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      // roles ['Admin', 'Investor']
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
      next();
    };
  };

exports.getUserInterestedListings = CatchAsync(async (req, res) => {

    const data = await User.findById(req.user.id).populate({
        path: "myInterestedListings",
        select: "company_domain brand_name registered_name office_location logo"
    });
    res.status(200).json({
        status: "success",
        data
    })

})

exports.getAllUsersInterestedListings = CatchAsync(async (req, res) => {

    const data = await User.find().populate({
        path: "myInterestedListings",
        select: "company_domain brand_name registered_name office_location logo"
    });

    res.status(200).json({
        status: "success",
        data
    })

})
