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
import "./SpecificCollection.css";

const SpecificCollection = () => {

    const dispatch = useDispatch();
    const { collectionId } = useParams()
    const cocktailsInList = useSelector(state => state.cocktailCollectionsJoin) /*? useSelector(state => state.cocktailCollectionsJoin) : []*/;
    const allCocktails = useSelector(state => state.cocktails);
    const allCollections = useSelector(state => state.collections);
    const currCollection = Object.values(allCollections).find(collection => collection.id === Number(collectionId))
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const [collectionName, setCollectionName] = useState('');
    const [editCollectionName, setEditCollectionName] = useState('');
    const [name, setName] = useState('');
    const [searchResults, setSearchResults] = useState('');

    useEffect(() => {
        if (user) dispatch(getAllCollectionsByUserThunk(user.id));
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(getAllCocktailsByCollectionThunk(collectionId));
    }, [dispatch, allCocktails]);

    useEffect(() => {
        dispatch(getAllCocktailsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (allCocktails) setSearchResults(Object.values(allCocktails).filter(cocktail => cocktail.name.toLowerCase().includes(name.toLowerCase())));
    }, [name]);

    const openSpecificDrink = (e, cocktail) => {
        e.preventDefault();
        history.push(`/drink/${cocktail.id}`);
    }

    const addDrink = (e, drinkId) => {
        e.preventDefault();
        setSearchResults('');
        setName('');
        if (!drinkId) {
            alert("Cocktail does not exist!");
            return;
        }
        if (Object.values(cocktailsInList)[0]?.some(el => el.cocktailId === Number(drinkId))) {
            alert("Cocktail already exists in your collection!");
            return;
        }
        const obj = { collectionId: Number(collectionId), cocktailId: Number(drinkId) }
        dispatch(addDrinkThunk(obj));
    }

    const removeDrinkFromList = (e, cocktailItem) => {
        // e.preventDefault();
        e.stopPropagation();
        dispatch(deleteCocktailFromCollectionThunk(cocktailItem))
        dispatch(getAllCocktailsByCollectionThunk(collectionId))
    }

    const deleteCollection = (e) => {
        // e.preventDefault();

        // if (cocktailsInList) {
        //     Object.values(cocktailsInList)[0].forEach(cocktail => dispatch(deleteCocktailFromCollectionThunk(cocktail)));
        // }

        // setTimeout(() => {
        //     if (currCollection) {
        //         console.log("in here IFFFFFFFFF")
        //         dispatch(deleteCollectionThunk(currCollection));
        //         history.push("/");
        //     }
        // }, 10);

        let test = new Promise((resolve) => {
            if (!Object.values(cocktailsInList).length) resolve(cocktailsInList);

            if (Object.values(cocktailsInList).length) {
                Object.values(cocktailsInList)[0].forEach(cocktail => dispatch(deleteCocktailFromCollectionThunk(cocktail)));
                resolve(cocktailsInList);
            }
        });

        test.then(() => {
            dispatch(deleteCollectionThunk(currCollection));
            history.push("/");
        });

    }

    const handleSubmitEditCollectionNameForm = (e) => {
        e.preventDefault();
        if (currCollection && collectionName === '' || !collectionName.trim()) {
            alert("name must not be empty!");
            return;
        }
        if (currCollection && collectionName === currCollection.name) {
            alert("no changes have been made!");
            return;
        }
        if (currCollection && collectionName.length > 40) {
            alert("Collection name cannot be longer than 40 characters!");
            return;
        }
        const exists = Object.values(allCollections).some(el => el.name === collectionName)

        if (exists) {
            alert("Collection with the same name already exists!");
            setCollectionName('');
            return;
        }
        let collectionObj = { id: currCollection.id, name: collectionName };
        dispatch(editCollectionThunk(collectionObj));
    }

    const handleEditCollectionName = (e) => {
        e.preventDefault();
        console.log(currCollection)
        setEditCollectionName(currCollection.name);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }

    return (
        <div style={{ paddingTop: '10px', paddingBottom: '110px', marginLeft: '3vw', marginRight: '3vw', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {user && currCollection && (
                <div style={{ width: '100%', maxWidth: '1180px' }}>
                    <h1 class="display-5" style={{ color: '#e00404', fontWeight: '200' }}>{currCollection.name}</h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px' }}>
                        <button type='submit' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddDrinkModal" /*onClick={() => setShowAddDrinkForm(true)}*/>Add Drink To Collection</button>
                        <div>
                            <button style={{ width: '20vw', maxWidth: '195.81px', marginRight: '2vw' }} type='button' class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#EditCollectionModal" onClick={(e) => handleEditCollectionName(e)} >Edit Collection Name</button>
                            <button style={{ width: '20vw', maxWidth: '195.81px' }} type='button' class="btn btn-outline-dark" onClick={(e) => deleteCollection(e)} >Delete Collection</button>
                        </div>
                    </div>
                </div>

            )}
            {user && currCollection && Object.keys(cocktailsInList).length === 0 && (
                <h1 style={{ color: '#e00404', fontWeight: '200', marginTop: '1vh' }}>There are no cocktails in collection!</h1>
            )}
            {cocktailsInList && allCocktails && (
                <div>
                    {Object.values(cocktailsInList)[0]?.map(cocktailItem => {
                        const cocktail = Object.values(allCocktails).find(cocktail => cocktail.id === cocktailItem.cocktailId)
                        return (
                            // <div>
                            //     <div style={{
                            //         border: "2px solid gray",
                            //         marginTop: '1vh',
                            //         padding: '10px'
                            //     }} onClick={(e) => openSpecificDrink(e, cocktail)}>
                            //         <img src={`${cocktail?.image}`} style={{ height: '20vh', width: '20vw' }}></img>
                            //         <div>{cocktail?.name}</div>
                            //         <button type='button' class="btn btn-outline-dark" onClick={(e) => removeDrinkFromList(e, cocktailItem)} style={{ marginTop: '7px' }}>Remove from List</button>
                            //     </div>
                            // </div>
                            <div class="card mb-3" style={{ width: '100%', maxWidth: '1200px', maxHeight: '30vh', marginTop: '2vh' }}>
                                <div class="row g-0">
                                    <div class="col-md-4" onClick={(e) => openSpecificDrink(e, cocktail)}>
                                        <img src={`${cocktail?.image}`} class="img-fluid rounded-start drinkImg" alt="..." style={{ maxHeight: '30vh' }} />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                            <h5 class="card-title">{cocktail?.name}</h5>
                                            <div>Ingredients: {cocktail?.ingredients}</div>
                                            <br></br>
                                            {/* <div>Instructions: {cocktail?.instructions}</div>
                                            <br></br> */}
                                            <div>Measurements: {cocktail?.measurements}</div>
                                            <br></br>
                                            <button type='button' class="btn btn-outline-dark" onClick={(e) => removeDrinkFromList(e, cocktailItem)} style={{ marginTop: '7px', width: '17vw', minWidth: '155px' }}>Remove from List</button>
                                            {/* <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
            }
            {/* <div style={{ marginTop: '2vh' }}>
                <button style={{ width: '20vw' }} type='button' class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#EditCollectionModal" onClick={(e) => handleEditCollectionName(e)} >Edit Collection Name</button>
                <button style={{ width: '20vw' }} type='button' class="btn btn-outline-dark" onClick={(e) => deleteCollection(e)} >Delete Collection</button>
            </div> */}

            <div class="modal fade" id="AddDrinkModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add a drink to your collection!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setName('')}></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <form class="d-flex" role="search" >
                                    <input class="form-control me-2" type="search" placeholder="Search for drinks!" aria-label="Search" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => handleKeyPress(e)}></input>
                                </form>
                                {searchResults && name && (
                                    <ul class="list-group"
                                        style={{
                                            position: 'absolute',
                                            width: '28.7rem',
                                            maxHeight: '15rem',
                                            overflow: 'auto',
                                            zIndex: '100'
                                        }}>
                                        {searchResults.map(cocktail => {
                                            return (
                                                <li style={{
                                                    cursor: "pointer",
                                                    display: 'flex'
                                                }} class="list-group-item list-group-item-action" onClick={(e) => addDrink(e, cocktail.id)} data-bs-dismiss="modal">
                                                    <i class="fas fa-cocktail" style={{ marginRight: '2rem', color: 'dodgerblue' }}></i>
                                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cocktail.name}</div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="EditCollectionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Collection Name</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" /*onClick={(e) => handleCloseModal(e)}*/></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => handleSubmitEditCollectionNameForm(e)}>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    {currCollection && <input class="form-control" placeholder="Name of collection" defaultValue={editCollectionName} onChange={(e) => setCollectionName(e.target.value)}></input>}
                                </div>
                                {currCollection && <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SpecificCollection;
