import { useEffect } from "react";
import { getAllCocktailsByCollectionThunk } from "../../store/cocktailCollectionJoin";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { addDrinkThunk } from "../../store/cocktailCollectionJoin";
import { getAllCollectionsByUserThunk } from "../../store/collections";
import { deleteCocktailFromCollectionThunk } from "../../store/cocktailCollectionJoin";
import { deleteCollectionThunk } from "../../store/collections";
import { useHistory } from "react-router-dom";
import { editCollectionThunk } from "../../store/collections";
import { getAllCocktailsThunk } from "../../store/cocktails";


const SpecificCollection = () => {

    const dispatch = useDispatch();
    const { collectionId } = useParams()
    const [showAddDrinkForm, setShowAddDrinkForm] = useState(false);
    const [drinkId, setDrinkId] = useState('');
    const cocktailsInList = useSelector(state => state.cocktailCollectionsJoin) ? useSelector(state => state.cocktailCollectionsJoin) : [];
    const allCocktails = useSelector(state => state.cocktails);
    const [showSpecificDrink, setShowSpecificDrink] = useState(false);
    const [clickedCocktail, setClickedCocktail] = useState('');
    const allCollections = useSelector(state => state.collections);
    const currCollection = Object.values(allCollections).find(collection => collection.id === Number(collectionId))
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const [showEditCollectionNameForm, setShowEditCollectionNameForm] = useState(false);
    const [collectionName, setCollectionName] = useState('');

    useEffect(() => {
        if (user) dispatch(getAllCollectionsByUserThunk(user.id));
        // dispatch(getAllCocktailsByCollectionThunk(Number(collectionId)));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllCocktailsByCollectionThunk(collectionId));
    }, [dispatch, allCocktails]);

    useEffect(() => {
        dispatch(getAllCocktailsThunk());
    }, [dispatch]);

    const openSpecificDrink = (e, cocktail) => {
        console.log(cocktail.id)
        e.preventDefault();
        // setShowSpecificDrink(!showSpecificDrink);
        // setClickedCocktail(cocktail);
        history.push(`/drink/${cocktail.id}`);
    }

    const addDrink = (e, drinkId) => {
        e.preventDefault();
        if (!drinkId) return
        if (Object.values(cocktailsInList)[0]?.some(el => el.cocktailId === Number(drinkId))) return;
        const obj = { collectionId: Number(collectionId), cocktailId: Number(drinkId) }
        dispatch(addDrinkThunk(obj));
    }

    const removeDrinkFromList = (e, cocktailItem) => {
        // e.preventDefault();
        e.stopPropagation();
        console.log(cocktailItem)
        dispatch(deleteCocktailFromCollectionThunk(cocktailItem))
        dispatch(getAllCocktailsByCollectionThunk(collectionId))
    }

    const deleteCollection = (e) => {
        e.preventDefault();
        if (currCollection) dispatch(deleteCollectionThunk(currCollection));
        history.push("/");
    }

    const editCollectionName = (e) => {
        e.preventDefault();
        setShowEditCollectionNameForm(true);
    }

    const handleSubmitEditCollectionNameForm = () => {
        let collectionObj = { id: currCollection.id, name: collectionName };
        dispatch(editCollectionThunk(collectionObj));
    }

    return (
        <div style={{ padding: '10px' }}>
            {user && currCollection && (
                <div>
                    <h1 class="display-4">{currCollection.name}</h1>
                    <button type='submit' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddDrinkModal" onClick={() => setShowAddDrinkForm(true)}>Add Drink To Collection</button>
                </div>
            )}
            {cocktailsInList && allCocktails && (
                <div>
                    {Object.values(cocktailsInList)[0]?.map(cocktailItem => {
                        const cocktail = Object.values(allCocktails).find(cocktail => cocktail.id === cocktailItem.cocktailId)
                        return (
                            <div>
                                <div style={{
                                    border: "2px solid green",
                                    marginTop: '1vh'
                                }} onClick={(e) => openSpecificDrink(e, cocktail)}>
                                    <img src={`${cocktail?.image}`} style={{ height: '20vh', width: '20vw' }}></img>
                                    <div>{cocktail?.name}</div>
                                    <button type='button' class="btn btn-outline-dark" onClick={(e) => removeDrinkFromList(e, cocktailItem)}>Remove from List</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
            }
            <div style={{ marginTop: '2vh' }}>
                <button style={{ width: '20vw' }} type='button' class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#EditCollectionModal" onClick={(e) => editCollectionName(e)}>Edit Collection Name</button>
                <button style={{ width: '20vw' }} type='button' class="btn btn-outline-dark" onClick={(e) => deleteCollection(e)}>Delete Collection</button>
            </div>
            {
                showAddDrinkForm && (
                    // <form onSubmit={(e) => addDrink(e, drinkId)}>
                    //     <div>
                    //         <input placeholder="Drink Id" value={drinkId} onChange={(e) => setDrinkId(e.target.value)}></input>
                    //     </div>
                    //     <button type="submit">Submit</button>
                    // </form>
                    <div class="modal fade" id="AddDrinkModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Leave a review!</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={(e) => addDrink(e, drinkId)}>
                                        <div>
                                            <input placeholder="Drink Id" value={drinkId} onChange={(e) => setDrinkId(e.target.value)}></input>
                                        </div>
                                        <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* {
                showSpecificDrink && (
                    <div style={{
                        border: "2px solid orange"
                    }}>
                        <div>{clickedCocktail.image}</div>
                        <div>{clickedCocktail.name}</div>
                        <div>{clickedCocktail.isAlcoholic}</div>
                        <div>{clickedCocktail.category}</div>
                        <div>{clickedCocktail.glassType}</div>
                        <div>{clickedCocktail.ingredients}</div>
                        <div>{clickedCocktail.measurements}</div>
                        <div>{clickedCocktail.instructions}</div>
                    </div>
                )
            } */}
            {showEditCollectionNameForm && (
                // <form style={{
                //     border: "2px solid green"
                // }} onSubmit={handleSubmitEditCollectionNameForm}>
                //     <div>Edit Collection Name Form</div>
                //     <div>
                //         <input placeholder="Name of collection" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}></input>
                //     </div>
                //     <button type="submit">Submit</button>
                // </form>
                <div class="modal fade" id="EditCollectionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Collection Name</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={handleSubmitEditCollectionNameForm}>
                                    <input placeholder="Name of collection" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}></input>
                                    <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default SpecificCollection;
