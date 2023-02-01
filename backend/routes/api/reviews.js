const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Review } = require('../../db/models');

// get all reviews for a current cocktail
router.get('/:cocktailId', async (req, res) => {
    const allReviews = await Review.findAll({
        where: {
            cocktailId: req.params.cocktailId
        }
    });

    return res.json({ Reviews: allReviews });
});

//edit a review
router.put('/:reviewId', requireAuth, async (req, res, next) => {

    const reviewToEdit = await Review.findOne({
        where: {
            id: req.params.reviewId
        }
    });
    const userid = req.user.id;
    const { review, stars, userId, cocktailId } = req.body;

    // if (!cocktail) {
    //     const myError = {
    //         message: "Cocktail couldn't be found",
    //         statusCode: 404,
    //     };
    //     return res.status(404).json(myError);
    // }

    // if (userId !== cocktail.creatorId) {
    //     const myError = {
    //         message: "must be the creator of the cocktail in order to edit the cocktail."
    //     }
    //     return res.status(403).json(myError);
    // }

    if (userid === reviewToEdit.userId) {

        await reviewToEdit.update({
            review, stars, userId, cocktailId
        });

        return res.json(reviewToEdit);
    }

});

//delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {

    const review = await Review.findOne({
        where: {
            id: req.params.reviewId
        }
    });
    const userId = req.user.id;

    // if (!review) {
    //     const myError = {
    //         message: "Review couldn't be found",
    //         statusCode: 404,
    //     };
    //     return res.status(404).json(myError);
    // }

    if (userId === review.userId) {

        await review.destroy({
            where: {
                id: req.params.reviewId
            }
        });

        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });

    }

    if (userId !== review.userId) {
        const myError = {
            message: "must be the owner of the review in order to delete the review."
        }
        return res.status(403).json(myError);
    }
});

module.exports = router;
