const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
// const { Cocktail, Review } = require('../../db/models');
const { Collections } = require('../../db/models');

// create a collection
router.post('/', requireAuth, async (req, res, next) => {
    const { name, drinks } = req.body;
    console.log(name);
    console.log(drinks)
    try {
        const collection = await Collections.create({
            creatorId: req.user.id,
            name,
            drinks
        });

        return res.status(201).json(collection);
    } catch (e) {
        e.status = 400;
        next(e);
    }
});

module.exports = router;
