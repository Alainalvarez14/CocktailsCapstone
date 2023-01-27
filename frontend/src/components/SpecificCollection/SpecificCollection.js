import { useEffect } from "react";
import { getAllCocktailsByCollectionThunk } from "../../store/cocktailCollectionJoin";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { addDrinkThunk } from "../../store/cocktailCollectionJoin";


const SpecificCollection = () => {

    const dispatch = useDispatch();
    const { collectionId } = useParams();
    const [showAddDrinkForm, setShowAddDrinkForm] = useState(false);
    const [drinkId, setDrinkId] = useState('');
    const cocktailsInList = useSelector(state => state.cocktailCollectionsJoin);

    useEffect(() => {
        dispatch(getAllCocktailsByCollectionThunk(Number(collectionId)));
    }, [dispatch]);

    // const showAllDrinks = (e) => {
    //     e.preventDefault();
    // }

    const addDrink = (e, drinkId) => {
        e.preventDefault();
        if (Object.values(cocktailsInList).some(el => el.cocktailId === Number(drinkId))) return;
        const obj = { collectionId: Number(collectionId), cocktailId: Number(drinkId) }
        dispatch(addDrinkThunk(obj));
    }

    return (
        <div>
            <ul>
                <li onClick={() => setShowAddDrinkForm(!showAddDrinkForm)}>Add Drink</li>
                {/* <li onClick={(e) => showAllDrinks(e)}>Show Drinks</li> */}
            </ul>
            <button>Edit Collection Name</button>
            <button>Delete Collection</button>
            {showAddDrinkForm && (
                <form onSubmit={(e) => addDrink(e, drinkId)}>
                    <div>
                        <input placeholder="Drink Id" value={drinkId} onChange={(e) => setDrinkId(e.target.value)}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    )
}

export default SpecificCollection;
