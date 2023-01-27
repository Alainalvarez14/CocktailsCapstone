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
    const [showOptions, setShowOptions] = useState(false);


    const openSpecificCollection = (e, collection) => {
        e.preventDefault();
        dispatch(getAllCocktailsByCollectionThunk(collection));
        // history.push(`/collections/${collection.id}`);
    }

    const addDrink = (e, collection) => {
        e.preventDefault();
        const obj = { collectionId: collection.id, cocktailId: 1 }
        // history.push(`/collections/${collection.id}`);
        dispatch(addDrinkThunk(obj));
        // dispatch(addDrinkThunk(collection.id, drinkId));
    }

    return (
        <div>{Object.values(allCollections).map(collection => {
            // return (
            //     <div style={{
            //         border: "1px solid orange",
            //         marginTop: "5px"
            //     }} onClick={(e) => openSpecificCollection(e, collection)}>{collection.name}</div>
            // )
            return (
                <div>
                    <div style={{
                        border: "1px solid orange",
                        marginTop: "5px"
                    }} onClick={() => setShowOptions(!showOptions)}>
                        {collection.name}
                    </div>
                    {showOptions && (
                        <ul>
                            <li onClick={(e) => addDrink(e, collection)}>Add Drink</li>
                            <li onClick={(e) => openSpecificCollection(e, collection)}>Show Drinks</li>
                        </ul>
                    )}
                </div>
            )
        })}</div>
    )
}

export default Collections;
