import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllCocktailsThunk } from "../../store/cocktails";
import { deleteCocktailThunk } from "../../store/cocktails";
import { editCocktailThunk } from "../../store/cocktails";
import { useHistory } from "react-router";
import { createReviewThunk } from "../../store/reviews";
import { getAllReviewsForSpecificCocktailThunk } from "../../store/reviews";
import { deleteReviewThunk } from "../../store/reviews";
import { editReviewThunk } from "../../store/reviews";

const SpecificCocktail = () => {

    const user = useSelector(state => state.session.user);
    const { drinkId } = useParams();
    const { reviewId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    // const [showEditForm, setShowEditForm] = useState(false);
    const [showEditReviewForm, setShowEditReviewForm] = useState(false);
    // const [showReviewForm, setShowReviewForm] = useState(false);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [isAlcoholic, setIsAlcoholic] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [glassType, setGlassType] = useState('');
    const [instructions, setInstructions] = useState('');
    const [measurements, setMeasurements] = useState('');
    const [reviewToEdit, setReviewToEdit] = useState('');
    const [review, setReview] = useState(reviewToEdit.review);
    const [stars, setStars] = useState(reviewToEdit.stars);
    const allCocktails = useSelector(state => state.cocktails);
    const specificCocktail = Object.values(allCocktails).filter(cocktail => cocktail.id === Number(drinkId))[0];
    const [showReviews, setShowReviews] = useState(false);
    const allReviewsForCocktail = useSelector(state => state.reviews);

    useEffect(() => {
        dispatch(getAllCocktailsThunk());
        //
    }, [dispatch]);

    const handleDelete = (e, cocktail) => {
        e.preventDefault;
        dispatch(deleteCocktailThunk(cocktail));
        history.push("/");
    }

    const handleSubmitEditForm = () => {
        let cocktailObj = { id: specificCocktail.id, name, ingredients, isAlcoholic, category, image, glassType, instructions, measurements };
        dispatch(editCocktailThunk(cocktailObj));
        // setShowEditForm(false);
    }

    const handleSubmitReviewForm = () => {
        let reviewObj = { review, stars, userId: user.id, cocktailId: specificCocktail.id };
        dispatch(createReviewThunk(reviewObj));
        // setShowReviewForm(false);
    }

    const seeAllReviews = (e) => {
        e.preventDefault();
        dispatch(getAllReviewsForSpecificCocktailThunk(specificCocktail));
        setShowReviews(!showReviews);
    }

    const handleDeleteReview = (e, review) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(review));
    }

    const handleSubmitEditReviewForm = () => {
        let reviewObj = { id: reviewToEdit.id, review, stars, userId: user.id, cocktailId: specificCocktail.id };
        console.log(reviewObj)
        dispatch(editReviewThunk(reviewObj));
        setShowEditReviewForm(false);
    }

    const openReviewForm = (e, review) => {
        e.preventDefault()
        // console.log(review)
        // setShowEditReviewForm(!showEditReviewForm)
        setReviewToEdit(review);
    }

    return (
        <div>
            {specificCocktail && (
                <div style={{
                    width: "80vw",
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <h1 class="display-4">{specificCocktail.name}</h1>
                        <div style={{
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        }}>
                            <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" /*onClick={() => setShowReviewForm(!showReviewForm)}*/>Leave a Review!</button>
                            <button type="button" class="btn btn-outline-dark" onClick={(e) => seeAllReviews(e)}>See all reviews</button>

                        </div>
                    </div>
                    <img src={`${specificCocktail.image}`} class="img-fluid"></img>
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <th scope="row">Drink Type:</th>
                                <td>{specificCocktail.isAlcoholic.toString() ? "Alcoholic" : "NonAlcoholic"}</td>
                            </tr>
                            <tr>
                                <th scope="row">Glass Type:</th>
                                <td>{specificCocktail.glassType}</td>
                            </tr>
                            <tr>
                                <th scope="row">Ingredients:</th>
                                <td colspan="2"></td>
                            </tr>
                            <tr>
                                <th scope="row">Instructions:</th>
                                <td colspan="2">{specificCocktail.instructions}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Leave a review!</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={handleSubmitReviewForm}>
                                        <div>
                                            <input placeholder='Review' value={review} onChange={(e) => setReview(e.target.value)}></input>
                                        </div>
                                        <div>
                                            <input placeholder='Stars' value={stars} onChange={(e) => setStars(e.target.value)}></input>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit review</button>
                                    </form>
                                </div>
                                {/* <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Submit review</button>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="EditReviewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit a review!</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={handleSubmitEditReviewForm}>
                                        <div>
                                            <input placeholder='Review' defaultValue={reviewToEdit.review} onChange={(e) => setReview(e.target.value)}></input>
                                            {console.log(reviewToEdit.review)}
                                        </div>
                                        <div>
                                            <input placeholder='Stars' defaultValue={reviewToEdit.stars} onChange={(e) => setStars(e.target.value)}></input>
                                        </div>
                                        <button type='submit' class="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {user && specificCocktail && specificCocktail.creatorId === user.id && (
                <div>
                    <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#EditCocktailModal" /*onClick={() => setShowEditForm(!showEditForm)}*/>EDIT</button>
                    <button type="button" class="btn btn-outline-dark" onClick={(e) => handleDelete(e, specificCocktail)}>DELETE</button>
                </div>
            )}
            {/* {user && specificCocktail && specificCocktail.creatorId === user.id && showEditForm && (
                <form onSubmit={handleSubmitEditForm}>
                    <div>
                        <input placeholder='Cocktail Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder='Ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder='isAlcoholic' value={isAlcoholic} onChange={(e) => setIsAlcoholic(e.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder='Image' value={image} onChange={(e) => setImage(e.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder='Glass Type' value={glassType} onChange={(e) => setGlassType(e.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder='Instructions' value={instructions} onChange={(e) => setInstructions(e.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder='Measurements' value={measurements} onChange={(e) => setMeasurements(e.target.value)}></input>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            )} */}



            {/* {user && specificCocktail && specificCocktail.creatorId === user.id && showEditForm && ( */}
            <div class="modal fade" id="EditCocktailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit a cocktail!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmitEditForm}>
                                <div>
                                    <input placeholder='Cocktail Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='isAlcoholic' value={isAlcoholic} onChange={(e) => setIsAlcoholic(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Image' value={image} onChange={(e) => setImage(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Glass Type' value={glassType} onChange={(e) => setGlassType(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Instructions' value={instructions} onChange={(e) => setInstructions(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Measurements' value={measurements} onChange={(e) => setMeasurements(e.target.value)}></input>
                                </div>
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}
            {specificCocktail && /*!showReviewForm && */showReviews && (
                <div>
                    <h1 class="display-5">Reviews</h1>
                    {Object.values(allReviewsForCocktail).map(review => {
                        return (
                            <div class="card">
                                <div class="card-body">
                                    <div>{review.review}</div>
                                    <div>stars: {review.stars}</div>
                                    <div>Reviewed by: User{review.userId}</div>
                                    {user && user.id === review.userId && (
                                        <div>
                                            <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#EditReviewModal" onClick={(e) => openReviewForm(e, review)}>EDIT REVIEW</button>
                                            <button type="button" class="btn btn-outline-dark" onClick={(e) => handleDeleteReview(e, review)}>DELETE REVIEW</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SpecificCocktail;
