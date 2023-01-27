import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllCocktailsByCollectionThunk } from "../../store/cocktailCollectionJoin";
import { addDrinkThunk } from "../../store/cocktailCollectionJoin";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Collections = () => {

    const allCollections = useSelector(state => state.collections);
    const history = useHistory();
    const dispatch = useDispatch();
    // const [showOptions, setShowOptions] = useState(false);
    // const [showAddDrinkForm, setShowAddDrinkForm] = useState(false);
    // const [drinkId, setDrinkId] = useState('');


    const openSpecificCollection = (e, collection) => {
        e.preventDefault();
        dispatch(getAllCocktailsByCollectionThunk(collection.id));
        history.push(`/collections/${collection.id}`);
    }

    // const addDrink = (e, collection, drinkId) => {
    //     e.preventDefault();
    //     const obj = { collectionId: collection.id, cocktailId: Number(drinkId) }
    //     // history.push(`/collections/${collection.id}`);
    //     dispatch(addDrinkThunk(obj));
    //     // dispatch(addDrinkThunk(collection.id, drinkId));
    // }

    return (
        <div>
            {Object.values(allCollections).map(collection => {
                return (
                    <div>
                        <div style={{
                            border: "1px solid orange",
                            marginTop: "5px"
                        }} onClick={(e) => openSpecificCollection(e, collection)} /* onClick={() => setShowOptions(!showOptions)} */ >
                            {collection.name}
                        </div>
                        {/* {showOptions && (
                            <ul>
                                // <li onClick={(e) => addDrink(e, collection)}>Add Drink</li>
                                <li onClick={() => setShowAddDrinkForm(!showAddDrinkForm)}>Add Drink</li>
                                <li onClick={(e) => openSpecificCollection(e, collection)}>Show Drinks</li>
                            </ul>
                        )}
                        {showAddDrinkForm && (
                            <form onSubmit={(e) => addDrink(e, collection, drinkId)}>
                                <div>
                                    <input placeholder="Drink Id" value={drinkId} onChange={(e) => setDrinkId(e.target.value)}></input>
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        )} */}
                    </div>
                )
            })}
        </div>
    )
}

export default Collections;
