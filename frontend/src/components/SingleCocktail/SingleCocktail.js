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
                                <div onClick={(e) => handleShowSpecificDrinkDetails(e, drink)} style={{
                                    border: '1px solid red',
                                    marginTop: '5px'
                                }}>
                                    <img src={`${drink.image}`} className="drinkImage"></img>
                                    <div>{drink.name}</div>
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
