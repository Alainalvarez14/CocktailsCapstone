import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useState } from 'react';
// import * as sessionActions from '../../store/session';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import CreateCocktailForm from '../CreateCocktailForm/CreateCocktailForm';
import MyCreatedCocktailList from '../MyCreatedCocktailList/MyCreatedCocktailList';
import Searchbar from '../Searchbar/Searchbar';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }) {
    const history = useHistory();
    // const dispatch = useDispatch();
    // const [showCreateForm, setShowCreateForm] = useState(false);
    // const [name, setName] = useState('');
    // const [ingredients, setIngredients] = useState('');
    // const [isAlcoholic, setIsAlcoholic] = useState('');
    // const [category, setCategory] = useState('');
    // const [image, setImage] = useState('');
    // const [glassType, setGlassType] = useState('');
    // const [instructions, setInstructions] = useState('');
    // const [measurements, setMeasurements] = useState('');


    // const handleSubmitForm = (e) => {
    //     e.preventDefault();
    //     let cocktailObj = { name, ingredients, isAlcoholic, category, image, glassType, instructions, measurements };
    //     dispatch(createCocktailThunk(cocktailObj));
    //     // dispatch(getAllCocktailsByUserThunk());
    //     // setShowCreateForm(false);
    // }

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Cocktail App</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a href="/" class="nav-link active" aria-current="page">Home</a>
                            </li>
                            <li class="nav-item"><CreateCocktailForm />
                            </li>
                            {/* <li class="nav-item">
                            {isLoaded && (
                                <a class="nav-link">
                                    <ProfileButton user={sessionUser} />
                                </a>
                            )}
                        </li> */}
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    {/* <li><a class="dropdown-item" href="#"><CreateCocktailForm /></a></li> */}
                                    <li><CreateCocktailForm /></li>
                                    {/* <li><a class="dropdown-item" href="#">Another action</a></li> */}
                                    {/* <li><MyCreatedCocktailList /></li> */}
                                    <li onClick={() => history.push("/myCreatedCocktailList")}><a class="dropdown-item" href="#">My Created Cocktails</a></li>
                                    {/* <div onClick={() => history.push("/myCreatedCocktailList")}>
                                    <li>My Created Cocktails</li>
                                </div> */}
                                    <li><hr class="dropdown-divider"></hr></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li>
                            {/* <li class="nav-item">
                                <a class="nav-link active" data-bs-toggle="modal" data-bs-target="#CreateCocktailModal">Create your cocktail</a>
                            </li> */}
                        </ul>
                        {/* <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                        <Searchbar />

                    </div>
                </div>
            </nav>
            {/* <div class="modal fade" id="CreateCocktailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Create a Cocktail!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmitForm}>

                                <input placeholder='Cocktail Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                                <input placeholder='Ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)}></input>
                                <input placeholder='isAlcoholic' value={isAlcoholic} onChange={(e) => setIsAlcoholic(e.target.value)}></input>
                                <input placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}></input>
                                <input placeholder='Image' value={image} onChange={(e) => setImage(e.target.value)}></input>
                                <input placeholder='Glass Type' value={glassType} onChange={(e) => setGlassType(e.target.value)}></input>
                                <input placeholder='Instructions' value={instructions} onChange={(e) => setInstructions(e.target.value)}></input>
                                <input placeholder='Measurements' value={measurements} onChange={(e) => setMeasurements(e.target.value)}></input>

                                <button type='submit' class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Navigation;
