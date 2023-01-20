import { useState } from "react";
import { useSelector } from "react-redux";
import './SingleCocktail.css';

const SingleCocktail = () => {

    const cocktail = useSelector(state => state.cocktails);
    const [specificDrinkDetails, setSpecificDrinkDetails] = useState(false);
    const specificCocktail = useSelector(state => Object.values(state.cocktails)[0]);

    const handleShowSpecificDrinkDetails = (e, cocktailId) => {
        e.preventDefault();
        setSpecificDrinkDetails(true);
        // dispatch(getSpecificDrinkDetails(cocktailId));
    }

    return (
        <div>
            {cocktail && (
                <div>
                    <div>
                        {Object.values(cocktail).map(drink => {
                            return (
                                <div onClick={(e) => handleShowSpecificDrinkDetails(e, drink.id)} style={{
                                    border: '1px solid red',
                                    marginTop: '5px'
                                }}>
                                    <div>{drink.image}</div>
                                    <img src={`${drink.image}`} className="drinkImage"></img>
                                    <div>{drink.name}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
            {specificDrinkDetails && (
                <div style={{
                    border: '1px solid blue',
                    marginTop: '5px'
                }}>
                    <div>Drink type: {specificCocktail.isAlcoholic} {specificCocktail.category}</div>
                    <div>Glass type: {specificCocktail.glassType}</div>

                    <h4>Ingredients</h4>
                    {/* {ingredientArr.length && measurementArr.length && (
                        ingredientArr.map((ingredient, i) => {
                            return (
                                <li>{ingredient} - {measurementArr[i]}</li>
                            )
                        })
                    )} */}

                    <div>Instructions: {specificCocktail.instructions}</div>

                </div>
            )}
        </div>
    )
}

export default SingleCocktail;
