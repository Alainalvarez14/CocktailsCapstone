import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCocktailsByUserThunk } from "../../store/cocktails";
import { useHistory } from "react-router";

const MyCreatedCocktailList = () => {

    const [showCreatedCocktailList, setShowCreatedCocktailList] = useState(false);
    const user = useSelector(state => state.session.user);
    const cocktails = useSelector(state => state.cocktails);

    let ownedCocktails;
    if (user) {
        ownedCocktails = Object.values(cocktails).filter(cocktail => cocktail.creatorId === user.id);
    }
    const dispatch = useDispatch();
    const history = useHistory();

    const handleOpenCreatedCocktailList = (e) => {
        e.preventDefault();
        setShowCreatedCocktailList(true);
        if (showCreatedCocktailList) {
            dispatch(getAllCocktailsByUserThunk());
            history.push("/myBar");
        }
    }

    return (
        <div>
            {/* <button onClick={(e) => handleOpenCreatedCocktailList(e)}>My Created Cocktail List</button> */}
            <a class="dropdown-item" href="#" onClick={(e) => handleOpenCreatedCocktailList(e)}>My Created Cocktail List</a>
            {showCreatedCocktailList && user && ownedCocktails && (
                <div>
                    <button onClick={() => setShowCreatedCocktailList(false)}>CLOSE LIST</button>
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
                </div>
            )}
        </div>
    )
}

export default MyCreatedCocktailList;
