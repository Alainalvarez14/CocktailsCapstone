const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
// const { Cocktail, Review } = require('../../db/models');

// create a collection
router.post('/', requireAuth, async (req, res, next) => {
    const { name, drinksToAdd } = req.body;

    try {
        const collection = await Collection.create({
            creatorId: req.user.id,
            name,
            drinksToAdd
        });

        return res.status(201).json(collection);
    } catch (e) {
        e.status = 400;
        next(e);
    }
});
