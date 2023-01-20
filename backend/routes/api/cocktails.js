const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Cocktail } = require('../../db/models');
const { Op } = require('sequelize');

// create a cocktail
router.post('/', requireAuth, async (req, res, next) => {
    console.log('hi')
    const { name, ingredients, isAlcoholic, category, image, glassType, instructions, measurements } = req.body;
    console.log(name);
    try {
        const cocktail = await Cocktail.create({
            creatorId: req.user.id,
            name,
            ingredients,
            isAlcoholic,
            category,
            image,
            glassType,
            instructions,
            measurements
        });

        console.log(cocktail)

        return res.status(201).json(cocktail);
    } catch (e) {
        e.status = 400;
        next(e);
    }
});

module.exports = router;
