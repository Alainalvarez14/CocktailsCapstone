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

module.exports = router;
