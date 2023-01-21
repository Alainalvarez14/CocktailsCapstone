import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllCocktailsThunk } from "../../store/cocktails";

const SpecificCocktail = () => {

    const user = useSelector(state => state.session.user);
    const { drinkId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCocktailsThunk());
    }, [dispatch]);

    const allCocktails = useSelector(state => state.cocktails);
    const specificCocktail = Object.values(allCocktails).filter(cocktail => cocktail.id === Number(drinkId))[0];
    console.log(specificCocktail)
    return (
        <div style={{
            border: '1px solid blue',
            marginTop: '5px',
            width: '400px',
            height: '600px'
        }}>
            <div>
                <div>{specificCocktail.image}</div>
                <div>{specificCocktail.name}</div>
                <div>Drink type: {specificCocktail.isAlcoholic.toString()}</div>

                <div>Glass type: {specificCocktail.glassType}</div>

                <h4>Ingredients</h4>


                <div>Instructions: {specificCocktail.instructions}</div>

            </div>
            {specificCocktail.creatorId === user.id && (
                <div>
                    <button>EDIT</button>
                    <button>DELETE</button>
                </div>
            )
            }
        </div>
    )
}

export default SpecificCocktail;
