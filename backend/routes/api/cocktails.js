const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Cocktail } = require('../../db/models');
const { Op } = require('sequelize');

// get all cocktails
router.get('/', async (req, res) => {
    // let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    // const allSpots = Object.keys(filterBy).length ? await Spot.findAll({
    //     where: filterBy,
    //     limit: size,
    //     offset
    // }) : await Spot.findAll({
    //     limit: size,
    //     offset
    // });

    // return res.json({ Spots: allSpots, page, size });

    const allCocktails = await Cocktail.findAll();

    return res.json({ Cocktails: allCocktails });
});



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

        // console.log(cocktail)

        return res.status(201).json(cocktail);
    } catch (e) {
        e.status = 400;
        next(e);
    }
});

//get all cocktails created by the current user
router.get('/current', requireAuth, async (req, res) => {
    const myCocktails = await Cocktail.findAll({
        where: {
            creatorId: req.user.id
        },
    });

    return res.json({ Cocktails: myCocktails });
});

module.exports = router;
