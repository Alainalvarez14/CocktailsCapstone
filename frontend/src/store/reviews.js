import { csrfFetch } from "./csrf";

const getAllReviewsForSpecificCocktail = list => ({
    type: 'GET_ALL_REVIEWS_FOR_SPECIFIC_COCKTAIL',
    payload: list
});

const createReview = (review) => {
    return ({
        type: 'CREATE_REVIEW',
        payload: review
    })
};

const deleteReview = review => ({
    type: 'DELETE_REVIEW',
    payload: review
});

export const getAllReviewsForSpecificCocktailThunk = (cocktail) => async dispatch => {
    const response = await fetch(`/api/reviews/${cocktail.id}`)

    if (response.ok) {
        const allReviews = await response.json();
        dispatch(getAllReviewsForSpecificCocktail(allReviews.Reviews));
    }
}

export const createReviewThunk = (review) => async dispatch => {
    const response = await csrfFetch(`/api/cocktails/${review.cocktailId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(createReview(review));
    }
};

export const editReviewThunk = (review) => async dispatch => {
    console.log('this is within the thunk')
    console.log(review)
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(createReview(review));
    }
}

export const deleteReviewThunk = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(deleteReview(review));
    }
}

const defaultState = {};
export const reviewsReducer = (state = defaultState, action) => {
    let newState;

    switch (action.type) {

        case 'GET_ALL_REVIEWS_FOR_SPECIFIC_COCKTAIL': {
            newState = {};
            // normalize data
            action.payload.forEach(review => newState[review.id] = review);
            return newState;
        }

        case 'CREATE_REVIEW': {
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }

        case 'DELETE_REVIEW': {
            newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default reviewsReducer;
