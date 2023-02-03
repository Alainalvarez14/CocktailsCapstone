import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCocktailsByUserThunk } from "../../store/cocktails";
import { useHistory } from "react-router";

const MyCreatedCocktailList = () => {

    const user = useSelector(state => state.session.user);
    const cocktails = useSelector(state => state.cocktails);
    const history = useHistory();

    let ownedCocktails;
    if (user) {
        ownedCocktails = Object.values(cocktails).filter(cocktail => cocktail.creatorId === user.id);
    }

    const handleShowSpecificDrinkDetails = (e, cocktail) => {
        e.preventDefault();
        history.push(`/drink/${cocktail.id}`);
    }

    return (
        <div>
            <h1 class="display-4">My Created Cocktail List</h1>
            {user && ownedCocktails && (
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    <div>{ownedCocktails.map(cocktail => {
                        return (
                            <div class="col">
                                <div class="card" onClick={(e) => handleShowSpecificDrinkDetails(e, cocktail)}>
                                    <img src={`${cocktail.image}`} style={{ height: '20vh' }} class="card-img-top drinkImage"></img>
                                    <div class="card-body">
                                        <h5 class="card-title">{cocktail.name}</h5>
                                        <div class="card-text">Ingredients: {cocktail.ingredients}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}</div>
                </div>
            )}
        </div>
    )
}

export default MyCreatedCocktailList;
