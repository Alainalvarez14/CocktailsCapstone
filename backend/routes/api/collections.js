const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
// const { Cocktail, Review } = require('../../db/models');
const { Collections, Cocktail, CocktailCollectionsJoin } = require('../../db/models');

// create a collection
router.post('/', requireAuth, async (req, res, next) => {
    const { name } = req.body;
    try {
        const collection = await Collections.create({
            creatorId: req.user.id,
            name,
        });

        return res.status(201).json(collection);
    } catch (e) {
        e.status = 400;
        next(e);
    }
});

// create a collectionJoins
router.post('/test', requireAuth, async (req, res, next) => {
    const { collectionId } = req.body;
    const { cocktailId } = req.body;

    try {
        const collection = await CocktailCollectionsJoin.create({
            collectionId,
            cocktailId,
        });

        return res.status(201).json(collection);
    } catch (e) {
        e.status = 400;
        next(e);
    }
});

// get all collections for a user
router.get('/user/:userId', requireAuth, async (req, res) => {

    const myCollections = await Collections.findAll({
        where: {
            creatorId: req.params.userId
        },

    });
    return res.json(myCollections);

});

//get all cocktails for current collection
router.get('/:collectionId', requireAuth, async (req, res) => {
    const myCocktails = await CocktailCollectionsJoin.findAll({
        where: {
            collectionId: req.params.collectionId,
        },
        include: { model: Cocktail }
    });


    // return res.json({ Cocktails: myCocktails.Cocktail });
    myCocktails.map(el => {
        Object.values(el);
    });
    return res.json(myCocktails);

    // const myCocktails = await Cocktail.findAll({
    //     where: {
    //         collectionId: req.params.collectionId,

    //     },
    //     include: Collections
    // });
});

module.exports = router;
