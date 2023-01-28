import { useDispatch, useSelector } from "react-redux";
import './SingleCocktail.css';
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { getAllCocktailsThunk } from "../../store/cocktails";

const SingleCocktail = () => {

    const cocktail = useSelector(state => state.cocktails);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCocktailsThunk());
    }, [dispatch]);

    const handleShowSpecificDrinkDetails = (e, cocktail) => {
        e.preventDefault();
        history.push(`/drink/${cocktail.id}`);
    }

    return (
        <div>
            {cocktail && (
                <div>
                    <div>
                        {Object.values(cocktail).map(drink => {
                            return (
                                // <div onClick={(e) => handleShowSpecificDrinkDetails(e, drink)} style={{
                                //     border: '1px solid red',
                                //     marginTop: '5px'
                                // }}>
                                //     <img src={`${drink.image}`} className="drinkImage"></img>
                                //     <div>{drink.name}</div>
                                // </div>
                                <div class="card" style={{ width: "18rem" }}>
                                    <img src={`${drink.image}`} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{drink.name}</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <a href="#" class="btn btn-primary" onClick={(e) => handleShowSpecificDrinkDetails(e, drink)}>See More</a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SingleCocktail;
