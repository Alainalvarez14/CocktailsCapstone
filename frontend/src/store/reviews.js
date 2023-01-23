import { csrfFetch } from "./csrf";

const createReview = (review) => {
    return ({
        type: 'CREATE_REVIEW',
        payload: review
    })
};

export const createReviewThunk = (review) => async dispatch => {

    const response = await csrfFetch('/api/reviews', {
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

const defaultState = {};
export const reviewsReducer = (state = defaultState, action) => {
    let newState;

    switch (action.type) {

        // case 'GET_ALL_REVIEWS': {
        //     newState = { ...state };
        //     // normalize data
        //     action.payload.forEach(review => newState[review.id] = review);
        //     return newState;
        // }

        case 'CREATE_REVIEW': {
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }

        // case 'DELETE_REVIEW': {
        //     newState = { ...state };
        //     delete newState[action.payload.id];
        //     return newState;
        // }

        default: {
            return state;
        }
    }
};
