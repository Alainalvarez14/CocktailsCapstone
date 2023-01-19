import { csrfFetch } from "./csrf";

export const createCocktail = (cocktail) => {
    return ({
        type: 'CREATE_COCKTAIL',
        payload: cocktail
    })
};

export const createCocktailThunk = (cocktail) => async dispatch => {
    const response = await csrfFetch(/*`/api/spots/${booking.spotId}/bookings`*/'', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cocktail)
    });

    if (response.ok) {
        const cocktail = await response.json();
        dispatch(createCocktail(cocktail));
    }
};

const defaultState = {};
export const cocktailsReducer = (state = defaultState, action) => {
    let newState;
    switch (action.type) {

        case 'CREATE_COCKTAIL': {
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        // case 'DELETE_BOOKING': {
        //     newState = { ...state };
        //     delete newState[action.payload.id];
        //     return newState;
        // }
        default: {
            return state;
        }
    }
};

export default cocktailsReducer;
