const createCollection = (collection) => {
    return ({
        type: 'CREATE_COLLECTION',
        payload: collection
    })
};

export const createCollectionThunk = (collection) => async dispatch => {
    console.log(collection)
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
