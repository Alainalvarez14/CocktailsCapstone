import { csrfFetch } from "./csrf";

const getAllCocktailsByUser = list => ({
    type: 'GET_ALL_COCKTAILS_BY_USER',
    payload: list
});

const getAllCocktails = list => ({
    type: 'GET_ALL_COCKTAILS',
    payload: list
});

const createCocktail = (cocktail) => {
    return ({
        type: 'CREATE_COCKTAIL',
        payload: cocktail
    })
};

const deleteCocktail = cocktail => ({
    type: 'DELETE_COCKTAIL',
    payload: cocktail
});

export const getAllCocktailsByUserThunk = () => async dispatch => {
    const response = await fetch('/api/cocktails/current')

    if (response.ok) {
        const list = await response.json();
        dispatch(getAllCocktailsByUser(list.Cocktails));
    }
}
//
export const getAllCocktailsThunk = () => async dispatch => {
    const response = await fetch('/api/cocktails')

    if (response.ok) {
        const allCocktails = await response.json();
        dispatch(getAllCocktails(allCocktails.Cocktails));
    }
}

export const createCocktailThunk = (cocktail) => async dispatch => {
    // console.log(cocktail);
    const { image, name, ingredients, instructions, isAlcoholic, measurements, category, glassType } = cocktail;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("isAlcoholic", isAlcoholic);
    formData.append("measurements", measurements);
    formData.append("category", category);
    formData.append("glassType", glassType);

    if (image) formData.append("image", image);

    const response = await csrfFetch('/api/cocktails', {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify(cocktail)
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if (response.ok) {
        const cocktail = await response.json();
        dispatch(createCocktail(cocktail));
    }
};

export const editCocktailThunk = (cocktail) => async dispatch => {
    const { image, name, ingredients, instructions, isAlcoholic, measurements, category, glassType } = cocktail;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("isAlcoholic", isAlcoholic);
    formData.append("measurements", measurements);
    formData.append("category", category);
    formData.append("glassType", glassType);

    if (image) formData.append("image", image);

    const response = await csrfFetch(`/api/cocktails/${cocktail.id}`, {
        method: "PUT",
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify(cocktail)
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if (response.ok) {
        const cocktail = await response.json();
        dispatch(createCocktail(cocktail));
    }
}

export const deleteCocktailThunk = (cocktail) => async dispatch => {
    const response = await csrfFetch(`/api/cocktails/${cocktail.id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(deleteCocktail(cocktail));
    }
}

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

        case 'GET_ALL_COCKTAILS': {
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

export default cocktailsReducer;
