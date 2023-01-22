import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllCocktailsThunk } from "../../store/cocktails";
import { deleteCocktailThunk } from "../../store/cocktails";
import { useHistory } from "react-router";

const SpecificCocktail = () => {

    const user = useSelector(state => state.session.user);
    const { drinkId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllCocktailsThunk());
    }, [dispatch]);

    const allCocktails = useSelector(state => state.cocktails);
    const specificCocktail = Object.values(allCocktails).filter(cocktail => cocktail.id === Number(drinkId))[0];
    console.log(specificCocktail)

    const handleDelete = (e, cocktail) => {
        e.preventDefault;
        dispatch(deleteCocktailThunk(cocktail));
        history.push("/");
    }

    return (
        <div style={{
            border: '1px solid blue',
            marginTop: '5px',
            width: '400px',
            height: '600px'
        }}>
            {user && specificCocktail && (
                <div>
                    <div>{specificCocktail.image}</div>
                    <div>{specificCocktail.name}</div>
                    <div>Drink type: {specificCocktail.isAlcoholic.toString()}</div>

                    <div>Glass type: {specificCocktail.glassType}</div>

                    <h4>Ingredients</h4>


                    <div>Instructions: {specificCocktail.instructions}</div>

                </div>
            )}
            {user && specificCocktail && specificCocktail.creatorId === user.id && (
                <div>
                    <button>EDIT</button>
                    <button onClick={(e) => handleDelete(e, specificCocktail)}>DELETE</button>
                    {/* <button onClick={() => dispatch(deleteCocktailThunk(specificCocktail))}>DELETE</button> */}
                </div>
            )}
        </div>
    )
}

export default SpecificCocktail;
