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
    const specificCocktail = Object.values(allCocktails).filter(cocktail => cocktail.id === Number(drinkId));

    return (
        <div style={{
            border: '1px solid blue',
            marginTop: '5px'
        }}>
            <div>
                <div>Drink type: {specificCocktail.map(el => {
                    return (
                        <div>{el.isAlcoholic}</div>
                    )
                })}</div>
                <div>Glass type: {specificCocktail.glassType}</div>

                <h4>Ingredients</h4>


                <div>Instructions: {specificCocktail.instructions}</div>

            </div>
            {specificCocktail.map(el => {
                if (el.creatorId === user.id) {
                    return (
                        <div>
                            <button>EDIT</button>
                            <button>DELETE</button>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default SpecificCocktail;
