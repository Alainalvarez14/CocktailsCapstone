import { useState } from "react";
import { useSelector } from "react-redux";

const MyCreatedCocktailList = () => {

    const [showCreatedCocktailList, setShowCreatedCocktailList] = useState(false);
    const user = useSelector(state => state.user);

    return (
        <div>
            <button onClick={() => setShowCreatedCocktailList(true)}>My Created Cocktail List</button>
            {showCreatedCocktailList && user && (
                <div>hi</div>
            )}
        </div>
    )
}

export default MyCreatedCocktailList;
