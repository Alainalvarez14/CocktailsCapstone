import { csrfFetch } from "./csrf";

const getAllCocktailsByUser = list => ({
    type: 'GET_ALL_COCKTAILS_BY_USER',
    payload: list
});

const createCocktail = (cocktail) => {
    return ({
        type: 'CREATE_COCKTAIL',
        payload: cocktail
    })
};

export const getAllCocktailsByUserThunk = () => async dispatch => {
    const response = await fetch('/api/cocktails/current')

    if (response.ok) {
        const list = await response.json();
        dispatch(getAllCocktailsByUser(list.Cocktails));
    }
}

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

        case 'GET_ALL_COCKTAILS_BY_USER': {
            newState = { ...state };
            // normalize data
            action.payload.forEach(cocktail => newState[cocktail.id] = cocktail);
            return newState;
        }
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
