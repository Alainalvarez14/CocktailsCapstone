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

//edit a collection
router.put('/:collectionId', requireAuth, async (req, res, next) => {
    const collection = await Collections.findOne({
        where: {
            id: req.params.collectionId
        }
    });
    const userId = req.user.id;
    const { name } = req.body;

    if (!collection) {
        const myError = {
            message: "Collection couldn't be found",
            statusCode: 404,
        };
        return res.status(404).json(myError);
    }

    if (userId !== collection.creatorId) {
        const myError = {
            message: "must be the creator of the collection in order to edit the collection."
        }
        return res.status(403).json(myError);
    }

    if (userId === collection.creatorId) {

        await collection.update({
            name,
        });

        return res.json(collection);
    }
});

//delete a collection
router.delete('/:collectionId', requireAuth, async (req, res) => {

    const collection = await Collections.findOne({
        where: {
            id: req.params.collectionId
        }
    });
    const userId = req.user.id;

    if (!collection) {
        const myError = {
            message: "Collection couldn't be found",
            statusCode: 404,
        };
        return res.status(404).json(myError);
    }

    if (userId === collection.creatorId) {

        // await collection.destroy({
        //     where: {
        //         id: req.params.collectionId
        //     }
        // });
        await collection.destroy();

        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    }

    if (userId !== collection.creatorId) {
        const myError = {
            message: "must be the creator of the collection in order to delete the collection."
        }
        return res.status(403).json(myError);
    }
});

// create a collectionJoins
router.post('/test', requireAuth, async (req, res, next) => {
    const { collectionId } = req.body;
    const { cocktailId } = req.body;

    const myCollection = await Collections.findByPk(collectionId);
    const myCocktail = await Cocktail.findByPk(cocktailId);

    try {
        myCollection.addCocktail(myCocktail);
        return res.status(201).json({ cocktailId, collectionId });

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
    // console.log('within getAllCocktailsForCurrentCollection Route')
    // console.log(req.params.collectionId)
    const myCocktails = await CocktailCollectionsJoin.findAll({
        where: {
            collectionId: req.params.collectionId,
        },
        // include: { model: Cocktail }
    });

    // console.log(myCocktails)

    // myCocktails.map(el => {
    //     Object.values(el);
    // });

    return res.json(myCocktails);

});

//delete a cocktail from a collection
router.delete('/:collectionId/:cocktailId', requireAuth, async (req, res) => {

    // const { collectionId } = req.params;
    // const { cocktailId } = req.params;

    // const myCollection = await Collections.findByPk(collectionId);
    // const myCocktail = await Cocktail.findByPk(cocktailId);

    const cocktail = await CocktailCollectionsJoin.findOne({
        where: {
            // CocktailId: null,
            // CollectionId: null,
            cocktailId: Number(req.params.cocktailId),
            collectionId: Number(req.params.collectionId)
        }
    });
    // const cocktail2 = await CocktailCollectionsJoin.findAll();
    // console.log(cocktail2)

    // if (!cocktail) {
    //     const myError = {
    //         message: "Cocktail couldn't be found",
    //         statusCode: 404,
    //     };
    //     return res.status(404).json(myError);
    // }
    // await cocktail.destroy();
    await CocktailCollectionsJoin.destroy({
        where: {
            cocktailId: req.params.cocktailId,
            collectionId: req.params.collectionId
        }
    });

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});

module.exports = router;
