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
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    {Object.values(cocktail).map(drink => {
                        return (
                            <div class="col">
                                <div class="card" onClick={(e) => handleShowSpecificDrinkDetails(e, drink)} style={{ cursor: "pointer" }}>
                                    <img src={`${drink.image}`} class="card-img-top drinkImage" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{drink.name}</h5>
                                        <p class="card-text">{drink.ingredients}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SingleCocktail;
