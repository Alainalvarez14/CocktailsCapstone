const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { singleMulterUpload } = require('../../awsS3');
const { singlePublicFileUpload } = require('../../awsS3');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
);

// Edit user
router.patch('/:userId', singleMulterUpload("profileImage"), requireAuth, asyncHandler(async (req, res, next) => {
    console.log('within route')
    console.log(req.params.userId)
    const user = await User.findOne({
        where: {
            id: req.params.userId
        }
    });
    console.log(user);
    // const userId = req.user.id;
    const { id, firstName, lastName, username, email } = req.body;
    // const profileImage = await singlePublicFileUpload(req.file);
    let profileImage;
    if (req.file) {
        profileImage = await singlePublicFileUpload(req.file);
    }

    // if (!user) {
    //     const myError = {
    //         message: "must be the creator of the cocktail in order to edit the cocktail."
    //     }
    //     return res.status(403).json(myError);
    // }

    await user.update({
        id, firstName, lastName, username, email, profileImage
    });

    return res.json(user);
})
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({ user: null });
    }
);

module.exports = router;
