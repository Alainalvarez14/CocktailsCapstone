const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload } = require('../../awsS3');
const { singlePublicFileUpload } = require('../../awsS3');
const router = express.Router();
const asyncHandler = require('express-async-handler');


const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    "/",
    singleMulterUpload("profileImage"),
    validateSignup,
    asyncHandler(async (req, res) => {
        console.log(req.file)
        const { email, firstName, lastName, password, username } = req.body;
        const profileImage = await singlePublicFileUpload(req.file);
        const user = await User.signup({ email, firstName, lastName, username, profileImage, password });

        setTokenCookie(res, user);

        return res.json({
            user: user
        });
    })
);

module.exports = router;
