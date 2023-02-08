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
    const dispatch = useDispatch();
    const history = useHistory();
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
    let hasLeftReview;
    if (user) {
        hasLeftReview = Object.values(allReviewsForCocktail).some(review => review.userId === user.id);
    }
    console.log(hasLeftReview);

    useEffect(() => {
        dispatch(getAllCocktailsThunk());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllReviewsForSpecificCocktailThunk(specificCocktail));
    }, []);

    const handleDelete = (e, cocktail) => {
        e.preventDefault();
        dispatch(deleteCocktailThunk(cocktail));
        history.push("/");
    }

    const handleSubmitEditForm = (e) => {
        e.preventDefault();
        let cocktailObj = { id: specificCocktail.id, name, ingredients, isAlcoholic, category, image, glassType, instructions, measurements };
        dispatch(editCocktailThunk(cocktailObj));
    }

    const handleSubmitReviewForm = (e) => {
        e.preventDefault();
        if (hasLeftReview) {
            return alert("cant leave more than one review!");
        }

        let reviewObj = { review, stars, userId: user.id, cocktailId: specificCocktail.id };
        dispatch(createReviewThunk(reviewObj));
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

    const handleSubmitEditReviewForm = (e) => {
        e.preventDefault();
        let reviewObj = { id: reviewToEdit.id, review, stars, userId: user.id, cocktailId: specificCocktail.id };
        console.log(reviewObj)
        dispatch(editReviewThunk(reviewObj));
        // setShowEditReviewForm(false);
    }

    const openReviewForm = (e, review) => {
        e.preventDefault()
        setReviewToEdit(review);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let cocktailObj = { name, ingredients, isAlcoholic, category, image, glassType, instructions, measurements };
        // dispatch(createCocktailThunk(cocktailObj));
        // dispatch(getAllCocktailsByUserThunk());
        // setShowCreateForm(false);
    }

    return (
        <div style={{ padding: '40px 40px 140px 40px' }}>
            {specificCocktail && (
                <div class="card" style={{ width: "80vw", maxWidth: '700px', display: 'flex', margin: 'auto' }}>
                    <div class="card-body">
                        <p class="card-text" style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <h1 class="display-4">{specificCocktail.name}</h1>
                            <div style={{
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                display: 'flex'
                            }}>
                                {user && user.id !== specificCocktail.creatorId && <button style={{ display: 'flex', marginLeft: 'auto', marginRight: '1vw' }} type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Leave a Review!</button>}
                                <button style={{ display: 'flex', marginRight: 'auto', marginLeft: '1vw' }} type="button" class="btn btn-outline-dark" onClick={(e) => seeAllReviews(e)}>See all reviews</button>
                            </div>
                        </p>
                    </div>
                    <img src={`${specificCocktail.image}`} class="card-img-top" alt="..." />
                    <div class="card-body">
                        {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Drink Type:</th>
                                    <td>{specificCocktail.isAlcoholic ? "Alcoholic" : "Non-Alcoholic"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Category:</th>
                                    <td>{specificCocktail.category}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Glass Type:</th>
                                    <td>{specificCocktail.glassType}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Ingredients:</th>
                                    <td colspan="2">{specificCocktail.ingredients}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Instructions:</th>
                                    <td colspan="2">{specificCocktail.instructions}</td>
                                </tr>
                            </tbody>
                        </table>
                        {user && specificCocktail && specificCocktail.creatorId === user.id && (
                            <div style={{ display: 'flex' }}>
                                <button style={{ width: '12vw', justifyContent: 'center', display: 'flex', marginLeft: 'auto', marginRight: '1vw' }} type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#EditCocktailModal">EDIT</button>
                                <button style={{ width: '12vw', justifyContent: 'center', display: 'flex', marginRight: 'auto', marginLeft: '1vw' }} type="button" class="btn btn-outline-dark" onClick={(e) => handleDelete(e, specificCocktail)}>DELETE</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Leave a review!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => handleSubmitReviewForm(e)}>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Review' value={review} onChange={(e) => setReview(e.target.value)}></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Stars' value={stars} onChange={(e) => setStars(e.target.value)}></input>
                                </div>
                                <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit review</button>
                            </form>
                        </div>
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
                            <form onSubmit={(e) => handleSubmitEditReviewForm(e)}>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Review' defaultValue={reviewToEdit.review} onChange={(e) => setReview(e.target.value)}></input>
                                    {console.log(reviewToEdit.review)}
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Stars' defaultValue={reviewToEdit.stars} onChange={(e) => setStars(e.target.value)}></input>
                                </div>
                                <button type='submit' data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="EditCocktailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit a cocktail!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => handleSubmitEditForm(e)}>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Cocktail Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)}></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Image' value={image} onChange={(e) => setImage(e.target.value)}></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Instructions' value={instructions} onChange={(e) => setInstructions(e.target.value)}></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Measurements' value={measurements} onChange={(e) => setMeasurements(e.target.value)}></input>
                                </div>
                                <fieldset class="form-group">
                                    <div class="row">
                                        <div class="col-sm-10">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value={true} onChange={(e) => setIsAlcoholic(e.target.value)} />
                                                <label class="form-check-label" for="gridRadios1">
                                                    Alcoholic
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value={false} onChange={(e) => setIsAlcoholic(e.target.value)} />
                                                <label class="form-check-label" for="gridRadios2">
                                                    Virgin
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <div class="form-group col-md-4">
                                    <label for="inputState">Category</label>
                                    <select id="inputState" class="form-control" onChange={(e) => setCategory(e.target.value)}>
                                        <option value="Cocktail">Cocktail</option>
                                        <option value="Sweet">Sweet</option>
                                        <option value="Tropical">Tropical</option>
                                        <option value="Shot">Shot</option>
                                        <option value="Sour">Sour</option>
                                        <option value="Wine">Wine</option>
                                    </select>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="inputState">Glass Type</label>
                                    <select id="inputState" class="form-control" onChange={(e) => setGlassType(e.target.value)}>
                                        <option value="Highball">Highball</option>
                                        <option value="Hurricane">Hurricane</option>
                                        <option value="Collins">Collins</option>
                                        <option value="Shot">Shot</option>
                                        <option value="Rocks">Rocks</option>
                                    </select>
                                </div>
                                <button type='submit' data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            {/* {<div class="modal fade" id="CreateCocktailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Create a Cocktail!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmitForm}>
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
                                <button type='submit' class="btn btn-primary"> Submit</button>
                            </form >
                        </div >
                    </div >
                </div >
            </div >} */}

            {/* {user && specificCocktail && specificCocktail.creatorId === user.id && (
                <div>
                    <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#EditCocktailModal">EDIT</button>
                    <button type="button" class="btn btn-outline-dark" onClick={(e) => handleDelete(e, specificCocktail)}>DELETE</button>
                </div>
            )} */}

            {
                specificCocktail && showReviews && (
                    <div>
                        <h1 class="display-5">Reviews</h1>
                        {Object.values(allReviewsForCocktail).length === 0 && (
                            <p>Be the first to leave a review!</p>
                        )}
                        {allReviewsForCocktail && Object.values(allReviewsForCocktail).map(review => {
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
                )
            }



        </div >
    )
}

export default SpecificCocktail;
