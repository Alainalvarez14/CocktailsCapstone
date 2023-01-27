const createCocktailCollectionJoin = (collection) => {
    return ({
        type: 'CREATE_COCKTAIL_COLLECTIONS_JOIN',
        payload: collection
    })
};


const getAllCocktailsByCollection = list => ({
    type: 'GET_ALL_COCKTAILS_BY_COLLECTION',
    payload: list
});

export const addDrinkThunk = (drink) => async dispatch => {
    const response = await csrfFetch('/api/collections/test', { /*drink.id interpolated rather than test?*/
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(drink)
    });

    if (response.ok) {
        const collection = await response.json();
        dispatch(createCocktailCollectionJoin(collection));
    }
}

export const getAllCocktailsByCollectionThunk = (collectionId) => async dispatch => {
    const response = await fetch(`/api/collections/${collectionId}`)

    if (response.ok) {
        const list = await response.json();
        dispatch(getAllCocktailsByCollection(list));
    }
}

// Refactor
const reduceObjValues = (obj, cache = {}) => {
    const objectValues = Object.keys(obj).reduce((acc, cur) => {
        if (!Array.isArray(obj[cur]) && typeof obj[cur] === 'object') {
            return reduceObjValues({ ...acc, ...obj[cur] }, cache);
        }
        acc[cur] = obj[cur];

        return acc;
    }, {});
    return {
        ...objectValues,
        ...cache,
    };
}

const defaultState = {};
// const defaultState = {collection: {}};
export const cocktailCollectionsJoinReducer = (state = defaultState, action) => {
    let newState;

    switch (action.type) {

        case 'CREATE_COCKTAIL_COLLECTIONS_JOIN': {
            newState = { ...state };
            newState[action.payload.cocktailId] = action.payload;
            return newState;
        }

        case 'GET_ALL_COCKTAILS_BY_COLLECTION': {
            newState = {};
            let tempState = action.payload.map(el => {
                return reduceObjValues(el)
            })
            tempState.forEach((cocktail, i) => newState[i + 1] = cocktail);
            console.log(newState)
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default cocktailCollectionsJoinReducer;