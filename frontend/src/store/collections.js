
// const getAllCocktailsByCollection = list => ({
//     type: 'GET_ALL_COCKTAILS_BY_COLLECTION',
//     payload: list
// });

const getAllCollectionsByUser = list => ({
    type: 'GET_ALL_COLLECTIONS_BY_USER',
    payload: list
});

const createCollection = (collection) => {
    return ({
        type: 'CREATE_COLLECTION',
        payload: collection
    })
};

// const addDrinkId = (id) => {
//     return ({
//         type: 'ADD_DRINK_ID',
//         payload: id
//     })
// }

export const getAllCollectionsByUserThunk = (userId) => async dispatch => {
    const response = await fetch(`/api/collections/user/${userId}`)
    if (response.ok) {
        const list = await response.json();
        dispatch(getAllCollectionsByUser(list));
    }
}

// export const getAllCocktailsByCollectionThunk = (collection) => async dispatch => {
//     console.log(collection);
//     const response = await fetch(`/api/collections/${collection.id}`)

//     if (response.ok) {
//         const list = await response.json();
//         console.log(list);
//         dispatch(getAllCocktailsByCollection(list));
//     }
// }

// export const addDrinkThunk = (drink) => async dispatch => {
//     const response = await csrfFetch('/api/collections/test', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(drink)
//     });

//     if (response.ok) {
//         const collection = await response.json();
//         dispatch(createCollection(collection));
//     }
// }

export const createCollectionThunk = (collection) => async dispatch => {
    const response = await csrfFetch('/api/collections', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(collection)
    });

    if (response.ok) {
        const collection = await response.json();
        dispatch(createCollection(collection));
    }
};

// const defaultState = {drinksToAdd: []};
const defaultState = {};
export const collectionsReducer = (state = defaultState, action) => {
    let newState;

    switch (action.type) {


        // case 'ADD_DRINK_ID': {
        //     newState = { ...state };
        //     newState.drinksToAdd.push(action.payload);
        //     return newState;
        // }

        case 'GET_ALL_COLLECTIONS_BY_USER': {
            newState = { ...state };
            // normalize data
            action.payload.forEach(collections => newState[collections.id] = collections);
            return newState;
        }

        case 'CREATE_COLLECTION': {
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default collectionsReducer;
