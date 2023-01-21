import { useState } from "react";
import { useSelector } from "react-redux";
import './SingleCocktail.css';
import { useHistory } from 'react-router-dom';
import SpecificCocktail from "../SpecificCocktail/SpecificCocktail";

const SingleCocktail = () => {

    const cocktail = useSelector(state => state.cocktails);
    // const [specificDrinkDetails, setSpecificDrinkDetails] = useState(false);
    // const specificCocktail = useSelector(state => Object.values(state.cocktails)[0]);
    const history = useHistory();


    const handleShowSpecificDrinkDetails = (e, cocktail) => {
        e.preventDefault();
        // const clickedCocktail = useSelector(state => Object.values(state.cocktails).filter(cocktail => cocktail.id === cocktailId));
        // const clickedCocktail = Object.values(cocktail).filter(cocktail => cocktail.id === cocktailId);

        // setSpecificDrinkDetails(!specificDrinkDetails);
        // if (clickedCocktail) {
        // console.log(clickedCocktail);
        console.log(cocktail);
        // <SpecificCocktail cocktailId={cocktail.id} cocktailName={cocktail.name} />
        history.push(`/drink/${cocktail.id}`);
        // }
        // dispatch(getSpecificDrinkDetails(cocktailId));
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
            {/* {specificDrinkDetails && (
                <div style={{
                    border: '1px solid blue',
                    marginTop: '5px'
                }}>
                    <div>Drink type: {specificCocktail.isAlcoholic} {specificCocktail.category}</div>
                    <div>Glass type: {specificCocktail.glassType}</div>

                    <h4>Ingredients</h4>


                    <div>Instructions: {specificCocktail.instructions}</div>

                </div>
            )} */}
        </div>
    )
}

export default SingleCocktail;
