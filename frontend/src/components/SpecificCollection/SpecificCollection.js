import { useEffect } from "react";
import { getAllCocktailsByCollectionThunk } from "../../store/collections";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const SpecificCollection = () => {

    const dispatch = useDispatch();
    // const selectedCollection = useSelector(state => state.collections);
    const allCollectionDrinks = useSelector(state => state.cocktails);
    useEffect(() => {
        // dispatch(getAllCocktailsByCollectionThunk(collection));
    }, [dispatch]);

    return (
        <div>hi</div>
    )
}

export default SpecificCollection;
