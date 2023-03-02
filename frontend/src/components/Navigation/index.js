import React from 'react';
import { useSelector } from 'react-redux';
import './Navigation.css';
import CreateCocktailForm from '../CreateCocktailForm/CreateCocktailForm';
import Searchbar from '../Searchbar/Searchbar';
import { useHistory } from 'react-router-dom';
import logo from '../../appLogo/logo.png'

function Navigation({ isLoaded }) {
    const history = useHistory();
    const user = useSelector(state => state.session.user);

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
            }} onClick={() => history.push("/")}></img>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a style={{ cursor: 'pointer' }} class="nav-link active" aria-current="page" onClick={() => history.push("/")}>Home</a>
                            </li>
                            {user && <li class="nav-item"><CreateCocktailForm /></li>}
                            {user && <li class="nav-item">
                                <li onClick={() => history.push("/myCreatedCocktailList")}><a class="nav-link active" href="#">My Created Cocktails</a></li>
                            </li>}
                        </ul>
                        <Searchbar />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;
