
const getAllCocktailsByCollection = list => ({
    type: 'GET_ALL_COCKTAILS_BY_COLLECTION',
    payload: list
});

const createCollection = (collection) => {
    return ({
        type: 'CREATE_COLLECTION',
        payload: collection
    })
};

export const getAllCocktailsByCollectionThunk = (collection) => async dispatch => {
    console.log(collection);
    const response = await fetch(`/api/collections/${collection.id}`)

    if (response.ok) {
        const list = await response.json();
        console.log(list);
        // dispatch(getAllCocktailsByCollection(list.Cocktails));
    }
}

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

const defaultState = {};
export const collectionsReducer = (state = defaultState, action) => {
    let newState;

    switch (action.type) {

        case 'GET_ALL_COCKTAILS_BY_COLLECTION': {
            newState = { ...state };
            // normalize data
            action.payload.forEach(collection => newState[collection.id] = collection);
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
