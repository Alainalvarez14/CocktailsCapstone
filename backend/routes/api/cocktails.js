const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Cocktail } = require('../../db/models');
const { Op } = require('sequelize');

// get all cocktails
router.get('/', async (req, res) => {

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

//delete a cocktail
router.delete('/:cocktailId', requireAuth, async (req, res) => {

    const cocktail = await Cocktail.findOne({
        where: {
            id: req.params.cocktailId
        }
    });
    const userId = req.user.id;

    if (!cocktail) {
        const myError = {
            message: "Cocktail couldn't be found",
            statusCode: 404,
        };
        return res.status(404).json(myError);
    }

    if (userId === cocktail.creatorId) {

        await cocktail.destroy({
            where: {
                id: req.params.cocktailId
            }
        });

        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });

    }

    if (userId !== spot.ownerId) {
        const myError = {
            message: "must be the owner of the spot in order to delete the spot."
        }
        return res.status(403).json(myError);
    }
});

module.exports = router;
