import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllCocktailsByCollectionThunk } from "../../store/cocktailCollectionJoin";
import { addDrinkThunk } from "../../store/cocktailCollectionJoin";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCollectionsByUserThunk } from "../../store/collections";

const Collections = () => {

    const allCollections = useSelector(state => state.collections);
    const history = useHistory();
    const dispatch = useDispatch();
    // const [showOptions, setShowOptions] = useState(false);
    // const [showAddDrinkForm, setShowAddDrinkForm] = useState(false);
    // const [drinkId, setDrinkId] = useState('');
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (user) dispatch(getAllCollectionsByUserThunk(user.id));
    }, [dispatch, user]);


    const openSpecificCollection = (e, collection) => {
        e.preventDefault();
        // dispatch(getAllCocktailsByCollectionThunk(collection.id));
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
            {user && Object.values(allCollections).map(collection => {
                return (
                    <li class="mb-1">
                        <button onClick={(e) => openSpecificCollection(e, collection)} class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">{collection.name}</button>
                    </li>
                )
            })}
        </div>
    )
}

export default Collections;
