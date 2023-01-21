import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCocktailsByUserThunk } from "../../store/cocktails";

const MyCreatedCocktailList = () => {

    const [showCreatedCocktailList, setShowCreatedCocktailList] = useState(false);
    const user = useSelector(state => state.session.user);
    const cocktails = useSelector(state => state.cocktails);
    const ownedCocktails = Object.values(cocktails).filter(cocktail => cocktail.creatorId === user.id);
    const dispatch = useDispatch();

    const handleOpenCreatedCocktailList = (e) => {
        e.preventDefault();
        setShowCreatedCocktailList(!showCreatedCocktailList);
        if (showCreatedCocktailList) {
            dispatch(getAllCocktailsByUserThunk());
        }
    }

    return (
        <div>
            <button onClick={(e) => handleOpenCreatedCocktailList(e)}>My Created Cocktail List</button>
            {showCreatedCocktailList && user && ownedCocktails.length && (
                <div>{ownedCocktails.map(cocktail => {
                    return (
                        <div style={{
                            border: '1px solid red',
                            marginTop: '5px'
                        }}>
                            <div>{cocktail.image}</div>
                            <div>{cocktail.name}</div>
                            <div>Ingredients: {cocktail.ingredients}</div>
                            <div>Measurements: {cocktail.measurements}</div>
                            <div>Instructions: {cocktail.instructions}</div>
                            <div>Category: {cocktail.category}</div>
                            <div>{cocktail.isAlcoholic ? 'Alcoholic Drink' : 'Virgin Drink'}</div>
                            <div>Glass Type: {cocktail.glassType}</div>
                        </div>
                    )
                })}</div>
            )}
        </div>
    )
}

export default MyCreatedCocktailList;
