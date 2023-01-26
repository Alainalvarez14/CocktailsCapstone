import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllCocktailsByCollectionThunk } from "../../store/collections";
import { useDispatch } from "react-redux";

const Collections = () => {

    const allCollections = useSelector(state => state.collections);
    const history = useHistory();
    const dispatch = useDispatch();

    const openSpecificCollection = (e, collection) => {
        e.preventDefault();
        // history.push(`/collections/${collection.id}`);
        dispatch(getAllCocktailsByCollectionThunk(collection));
    }

    return (
        <div>{Object.values(allCollections).map(collection => {
            return (
                <div style={{
                    border: "1px solid orange",
                    marginTop: "5px"
                }} onClick={(e) => openSpecificCollection(e, collection)}>{collection.name}</div>
            )
        })}</div>
    )
}

export default Collections;
