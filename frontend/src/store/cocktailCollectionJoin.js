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

const deleteCocktailFromCollection = cocktail => ({
    type: 'DELETE_COCKTAIL',
    payload: cocktail
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
    console.log('hereeeeeeee')
    const response = await fetch(`/api/collections/${collectionId}`)

    if (response.ok) {
        const list = await response.json();
        console.log(list)
        dispatch(getAllCocktailsByCollection(list));
    }
}

export const deleteCocktailFromCollectionThunk = (cocktail) => async dispatch => {
    console.log(cocktail)
    const response = await csrfFetch(`/api/collections/${cocktail.collectionId}/${cocktail.cocktailId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(deleteCocktailFromCollection(cocktail));
    }
}

// // Refactor
// const reduceObjValues = (obj, cache = {}) => {
//     const objectValues = Object.keys(obj).reduce((acc, cur) => {
//         if (!Array.isArray(obj[cur]) && typeof obj[cur] === 'object') {
//             return reduceObjValues({ ...acc, ...obj[cur] }, cache);
//         }
//         acc[cur] = obj[cur];

//         return acc;
//     }, {});
//     return {
//         ...objectValues,
//         ...cache,
//     };
// }

const defaultState = {};
// const defaultState = {collection: {}};
export const cocktailCollectionsJoinReducer = (state = defaultState, action) => {
    let newState;

    switch (action.type) {

        case 'CREATE_COCKTAIL_COLLECTIONS_JOIN': {
            newState = { ...state };
            if (newState[action.payload.collectionId]) {
                newState[action.payload.collectionId].push(action.payload);
            }
            else {
                newState[action.payload.collectionId] = [];
                newState[action.payload.collectionId].push(action.payload);
            }
            return newState;
        }

        case 'GET_ALL_COCKTAILS_BY_COLLECTION': {
            newState = {};
            // newState = {};
            // let tempState = action.payload.map(el => {
            //     return reduceObjValues(el)
            // })
            // tempState.forEach((cocktail, i) => newState[i + 1] = cocktail);
            action.payload.forEach(cocktail => {
                if (newState[cocktail.collectionId]) {
                    newState[cocktail.collectionId].push(cocktail);
                }
                else {
                    newState[cocktail.collectionId] = [];
                    newState[cocktail.collectionId].push(cocktail);
                }
            })
            return newState;
        }

        // case 'DELETE_COCKTAIL_FROM_COLLECTION': {
        //     newState = { ...state };
        //     delete newState[action.payload.id];
        //     return newState;
        // }
        case 'DELETE_COCKTAIL': {
            newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default cocktailCollectionsJoinReducer;
