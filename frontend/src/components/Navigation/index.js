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
import logo from '../../appLogo/logo.png'

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
        <div
            // class="sticky-top"
            style={{
                background: 'white',
            }}
        >
            <img class="navbar-brand" src={`${logo}`} style={{
                width: '35%',
                margin: '0 auto',
                display: 'flex',
                padding: '0.5rem 0'
            }}></img>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    {/* <img class="navbar-brand" src={`${logo}`} style={{
                        width: '12rem',
                    }}></img> */}
                    {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button> */}
                    {/* <div class="collapse navbar-collapse" id="navbarSupportedContent"> */}
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a href="/" class="nav-link active" aria-current="page">Home</a>
                        </li>
                        <li class="nav-item"><CreateCocktailForm /></li>
                        {/* <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    <li><CreateCocktailForm /></li>

                                    <li onClick={() => history.push("/myCreatedCocktailList")}><a class="dropdown-item" href="#">My Created Cocktails</a></li>

                                    <li><hr class="dropdown-divider"></hr></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li> */}
                        {/* <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li> */}
                        <li class="nav-item">
                            <li onClick={() => history.push("/myCreatedCocktailList")}><a class="nav-link active" href="#">My Created Cocktails</a></li>
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

                    {/* </div> */}
                </div>
            </nav>
        </div>
    );
}

export default Navigation;
