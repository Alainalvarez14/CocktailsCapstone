import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCocktailsByUserThunk } from "../../store/cocktails";
import { useHistory } from "react-router";

const MyCreatedCocktailList = () => {

    const user = useSelector(state => state.session.user);
    const cocktails = useSelector(state => state.cocktails);

    let ownedCocktails;
    if (user) {
        ownedCocktails = Object.values(cocktails).filter(cocktail => cocktail.creatorId === user.id);
    }


    return (
        <div>
            <a class="dropdown-item" href="#">My Created Cocktail List</a>
            {user && ownedCocktails && (
                <div>
                    <div>{ownedCocktails.map(cocktail => {
                        return (
                            <div style={{
                                border: '1px solid red',
                                marginTop: '5px'
                            }}>
                                <img src={`${cocktail.image}`} style={{ height: '20vh' }}></img>
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
