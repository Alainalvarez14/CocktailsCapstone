const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
// const { Cocktail, Review } = require('../../db/models');
const { Collections, Cocktail, CocktailCollectionsJoin } = require('../../db/models');

// create a collection
router.post('/', requireAuth, async (req, res, next) => {
    const { name, cocktail, cocktailId } = req.body;
    console.log(name);
    try {
        const collection = await Collections.create({
            creatorId: req.user.id,
            name,
            cocktail
        });

        return res.status(201).json(collection);
    } catch (e) {
        e.status = 400;
        next(e);
    }
});

//get all cocktails for current collection
router.get('/:collectionId', requireAuth, async (req, res) => {
    console.log(req.params.collectionId)
    const myCocktails = await CocktailCollectionsJoin.findAll({
        where: {
            collectionId: req.params.collectionId,
        },
        // include: { model: Cocktail }
    });

    console.log(myCocktails, "this is within Route")
    return res.json({ Cocktails: myCocktails.Cocktail });

    // const myCocktails = await Cocktail.findAll({
    //     where: {
    //         collectionId: req.params.collectionId,

    //     },
    //     include: Collections
    // });
});

module.exports = router;
