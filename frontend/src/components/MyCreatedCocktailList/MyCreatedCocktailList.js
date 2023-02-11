import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { getAllCocktailsThunk } from "../../store/cocktails";

const MyCreatedCocktailList = () => {

    const user = useSelector(state => state.session.user);
    const cocktails = useSelector(state => state.cocktails);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCocktailsThunk());
    }, [dispatch]);

    let ownedCocktails;
    if (user) {
        ownedCocktails = Object.values(cocktails).filter(cocktail => cocktail.creatorId === user.id);
    }

    const handleShowSpecificDrinkDetails = (e, cocktail) => {
        e.preventDefault();
        history.push(`/drink/${cocktail.id}`);
    }

    return (
        <div style={{ paddingBottom: '8rem', paddingTop: '2rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
            <h1 class="display-4">My Created Cocktail List</h1>
            {/* {console.log(ownedCocktails)} */}
            {!ownedCocktails.length && <div>You havent created any cocktails! You can create personalized cocktails by clicking "Create a Cocktail" in the navigation bar above!</div>}
            {ownedCocktails.map(cocktail => {
                return (
                    <div onClick={(e) => handleShowSpecificDrinkDetails(e, cocktail)} class="card mb-3" style={{ maxWidth: "1040px", cursor: 'pointer' }}>
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src={`${cocktail.image}`} class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h4 class="card-title">{cocktail.name}</h4>
                                    <p class="card-text">Ingredients: {cocktail.ingredients}</p>
                                    <p class="card-text">Instructions: {cocktail.instructions}</p>
                                    <p class="card-text">Measurements: {cocktail.measurements}</p>
                                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MyCreatedCocktailList;
