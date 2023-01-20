import { csrfFetch } from "./csrf";

const createCocktail = (cocktail) => {
    return ({
        type: 'CREATE_COCKTAIL',
        payload: cocktail
    })
};

export const createCocktailThunk = (cocktail) => async dispatch => {
    // console.log('within thunk!')
    const response = await csrfFetch('/api/cocktails', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cocktail)
    });
    console.log(response)

    if (response.ok) {
        const cocktail = await response.json();
        console.log(cocktail);
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
