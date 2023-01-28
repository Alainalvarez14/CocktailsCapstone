import { useDispatch, useSelector } from "react-redux";
import './SingleCocktail.css';
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";
import { getAllCocktailsThunk } from "../../store/cocktails";

const SingleCocktail = () => {

    const cocktail = useSelector(state => state.cocktails);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCocktailsThunk());
    }, [dispatch]);

    const handleShowSpecificDrinkDetails = (e, cocktail) => {
        e.preventDefault();
        history.push(`/drink/${cocktail.id}`);
    }

    return (
        <div>
            {cocktail && (
                // <div>
                //     <div>
                //         {Object.values(cocktail).map(drink => {
                //             return (
                //                 // <div class="row row-cols-1 row-cols-md-2 g-4">
                //                 //     <div class="col">
                //                 <div class="card" style={{ width: "18rem" }} onClick={(e) => handleShowSpecificDrinkDetails(e, drink)}>
                //                     <img src={`${drink.image}`} class="card-img-top" alt="..." />
                //                     <div class="card-body">
                //                         <h5 class="card-title">{drink.name}</h5>
                //                         <p class="card-text">{drink.ingredients}</p>
                //                         {/* <a href="#" class="btn btn-primary" onClick={(e) => handleShowSpecificDrinkDetails(e, drink)}>See More</a> */}
                //                     </div>
                //                     {/* </div>
                //                     </div> */}
                //                 </div>
                //             )
                //         })}
                //     </div>
                // </div>
                <div class="row row-cols-1 row-cols-md-4 g-4">
                    {/* <div class="col">
                        <div class="card">
                            <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                        </div>
                    </div> */}
                    {Object.values(cocktail).map(drink => {
                        return (
                            <div class="col">
                                <div class="card" onClick={(e) => handleShowSpecificDrinkDetails(e, drink)}>
                                    <img src={`${drink.image}`} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{drink.name}</h5>
                                        <p class="card-text">{drink.ingredients}</p>
                                        {/* <a href="#" class="btn btn-primary" onClick={(e) => handleShowSpecificDrinkDetails(e, drink)}>See More</a> */}
                                    </div>
                                </div>
                            </div>
                        )

                    })}
                </div>
            )}
        </div>
    )
}

export default SingleCocktail;
