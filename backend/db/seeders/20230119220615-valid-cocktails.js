'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Cocktails', [
      {
        creatorId: 1,
        name: 'Mojito',
        ingredients: 'mint, rum, club soda, simple syrup, lime',
        isAlcoholic: true,
        category: 'Cocktail',
        image: 'https://www.liquor.com/thmb/G6gVUxrTRCesHawcaUYl9ITSNmA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/mojito-720x720-primary-6a57f80e200c412e9a77a1687f312ff7.jpg',
        glassType: 'Highball glass',
        instructions: 'Lightly muddle the mint with the simple syrup in a shaker.Add the rum, lime juice and ice, and give it a brief shake, then strain into a highball glass over fresh ice. Alternatively, you can use pebble ice instead and gently swizzle it all together.Top with the club soda.Garnish with a mint sprig and lime wheel.',
        measurements: '3 mint leaves, 1/2 ounce simple syrup, 2 ounces white rum, fill with club soda, garnish with lime wheel',
      },
      {
        creatorId: 2,
        name: 'Rum and coke',
        ingredients: 'coke, rum',
        isAlcoholic: true,
        category: 'Cocktail',
        image: 'https://www.liquor.com/thmb/R5vwj9EQz6vEvy5upWtJGYos9cM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/rum-and-coke-720x720-primary-2d25470536c54528a8a02126fcec9989.jpg',
        glassType: 'Highball glass',
        instructions: 'Add all ingredients into a highball glass filled with ice and stir gently and briefly to combine.',
        measurements: '2 ounces rum, 4-6 ounces of coke'
      },
      {
        creatorId: 3,
        name: 'Virgin pina colada',
        ingredients: 'cream of coconut, pineapple juice, lime juice, pineapple wedge, pineapple leaf',
        isAlcoholic: false,
        category: 'Sweet, Tropical, Cocktail',
        image: 'https://www.liquor.com/thmb/hmc01qQqlwI0H1od1Qw0me4LEjI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__02__13090826__pina-colada-720x720-recipe-253f1752769447f6998afd2b9469c24e.jpg',
        glassType: 'Hurricane glass',
        instructions: 'Add the cream of coconut and pineapple and lime juices to a shaker with ice and shake vigorously for 20 to 30 seconds.Strain into a chilled Hurricane glass over pebble ice.Garnish with a pineapple wedge and pineapple leaf.',
        measurements: '1 1/2 ounces cream of coconut, 1 1/2 ounces pineapple juice, 1/2 ounce lime juice, freshly squeezed, Garnish: pineapple wedge, Garnish: pineapple leaf'
      },
      {
        creatorId: 1,
        name: 'Long Island Iced Tea',
        ingredients: 'vodka, white rum, silver tequila, gin, triple sec, simple syrup, lemon juice, freshly squeezed, Coke, lemon wedge',
        isAlcoholic: true,
        category: 'Sweet, Tropical, Cocktail',
        image: 'https://www.liquor.com/thmb/SPAiO_UXwUTFM-56-9FvrE9Efgo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__03__14090749__Long-Island-Iced-Tea-720x720-article-272623f47e80457594178a552f708068.jpg',
        glassType: 'Collins glass',
        instructions: 'Add the vodka, rum, tequila, gin, triple sec, simple syrup and lemon juice to a Collins glass filled with ice. Top with a splash of the coke and stir briefly. Garnish with a lemon wedge. Serve with a straw.',
        measurements: '3/4 ounce vodka, 3/4 ounce white rum, 3/4 ounce silver tequila, 3/4 ounce gin, 3/4 ounce triple sec, 3/4 ounce simple syrup, 3/4 ounce lemon juice, freshly squeezed, Coke to top of glass, Garnish: lemon wedge'
      },
      {
        creatorId: 1,
        name: 'Snap, Crackle, Drop',
        ingredients: 'Don Julio Reposado Tequila, Angostura bitters, freshly ground black pepper, lime wedge',
        isAlcoholic: true,
        category: 'Shot',
        image: 'https://www.liquor.com/thmb/HP8hE5oKmQ3DbJVRppFEFabMb-4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__liquor__2009__11__31085751__snap-crackle-drop-ed22e6b1bc554ce0b2f020b891a39e82.jpg',
        glassType: 'Shot glass',
        instructions: 'Pour the tequila into a shot glass or Old Fashioned glass. Stir together the bitters and pepper on a saucer until they form a paste and coat one side of the lime wedge with the mixture. Take a bite of the lime and then sip the spirit.',
        measurements: '1 1/2 ounces Don Julio Reposado Tequila, 7 dashes Angostura bitters, 4 twists freshly ground black pepper, 1 lime wedge'
      },
      {
        creatorId: 1,
        name: 'Bourbon Old Fashioned',
        ingredients: 'sugar, Angostura bitters, water, bourbon (or rye whiskey, if preferred), orange twist',
        isAlcoholic: true,
        category: 'Cocktail',
        image: 'https://www.liquor.com/thmb/NIIDroy7AQXG7DIMaCv7WQexmPw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__liquor__2018__05__08113350__bourbon-old-fashioned-720x720-recipe-ade6f7780c304999be3577e565c9bcdd.jpg',
        glassType: 'Rocks glass',
        instructions: 'Add the sugar and bitters into a mixing glass, then add the water, and stir until the sugar is nearly dissolved. Fill the mixing glass with ice, add the bourbon, and stir until well-chilled. Strain into a rocks glass over one large ice cube. Express the oil of an orange twist over the glass, then drop into the glass to garnish.',
        measurements: '1 teaspoon sugar, 3 dashes Angostura bitters, 1 teaspoon water, 2 ounces bourbon (or rye whiskey, if preferred), Garnish: orange twist'
      },
      {
        creatorId: 1,
        name: 'Tommys Margarita',
        ingredients: 'blanco tequila,  lime juice, freshly squeezed, agave nectar, salt',
        isAlcoholic: true,
        category: 'Cocktail, Tropical, Sour',
        image: 'https://www.liquor.com/thmb/K22Ma5SdVB8-18CNA6qsu1SFp24=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/tommys-margarita-720x720-primary-5f279f2138cb4eb599b43246d6ecd179.jpg',
        glassType: 'Rocks glass',
        instructions: 'Rim a rocks glass with salt and set it aside. Add the tequila, lime juice and agave nectar to a shaker with ice and shake until well-chilled. Strain over fresh ice into the prepared glass.',
        measurements: '2 ounces blanco tequila, 1 ounce lime juice, freshly squeezed, 1/2 ounce agave nectar, Garnish: salt rim'
      },
      {
        creatorId: 1,
        name: 'Kombucha Sangria',
        ingredients: 'red wine, Aperol, cherry (or other) kombucha, lemon juice, freshly squeezed, simple syrup, lemon slice',
        isAlcoholic: true,
        category: 'Wine, Tropical',
        image: 'https://www.liquor.com/thmb/2lonC5yCs3KT5BJBd5nJEJQtFcc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/kombucha-sangria-720x720-primary-108316bb052d41b6a305bbdb44d24eb5.jpg',
        glassType: 'Collins glass',
        instructions: 'Add all ingredients and ice into a Collins glass and stir to combine. Garnish with a lemon slice.',
        measurements: '1 1/2 ounces red wine, 3/4 ounce Aperol, 2 ounces cherry (or other) kombucha, 1/2 ounce lemon juice, freshly squeezed, 1/2 ounce simple syrup, Garnish: lemon slice'
      },
      {
        creatorId: 1,
        name: 'Screwdriver',
        ingredients: 'Vodka, Orange juice, freshly squeezed, to top',
        isAlcoholic: true,
        category: 'Cocktail, Tropical',
        image: 'https://www.liquor.com/thmb/uAy_UJauqmwoc3nlZMN8IveeLm8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__liquor__2017__11__06162348__screwdrvier-720x720-recipe-23e0c0ac47334f108e4fa00b34b7f5bf.jpg',
        glassType: 'Highball glass',
        instructions: 'Fill a highball glass with ice, then add the vodka. Top with the orange juice.',
        measurements: '1 1/2 ounces vodka, Orange juice, freshly squeezed, to top'
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Cocktails', {
      name: { [Op.in]: ['Mojito', 'Rum and coke', 'Virgin pina colada'] }
      // name: { [Op.in]: ['Mojito'] }
    }, {});
  }
};
