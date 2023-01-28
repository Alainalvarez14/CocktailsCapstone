import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
// import * as sessionActions from '../../store/session';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    // const dispatch = useDispatch();

    // const logout = (e) => {
    //     e.preventDefault();
    //     dispatch(sessionActions.logout());
    // };

    // let sessionLinks;
    // if (sessionUser) {
    //     sessionLinks = (
    //         <li>
    //             <ProfileButton user={sessionUser} />
    //             {/* <button onClick={logout}>Log Out</button> */}
    //         </li>
    //     );
    // } else {
    //     sessionLinks = (
    //         <li>
    //             <OpenModalButton
    //                 buttonText="Log In"
    //                 modalComponent={<LoginFormModal />}
    //             />
    //             <OpenModalButton
    //                 buttonText="Sign Up"
    //                 modalComponent={<SignupFormModal />}
    //             />
    //             {/* <NavLink to="/login">Log In</NavLink> */}
    //             {/* <NavLink to="/signup">Sign Up</NavLink> */}
    //         </li>
    //     );
    // }

    return (
        // <ul>
        //     <li>
        //         <NavLink exact to="/">Home</NavLink>
        //     </li>
        //     {isLoaded && (
        //         <li>
        //             <ProfileButton user={sessionUser} />
        //         </li>
        //     )}
        // </ul>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a href="/" class="nav-link active" aria-current="page">Home</a>
                        </li>
                        <li class="nav-item">
                            {isLoaded && (
                                <a class="nav-link">
                                    <ProfileButton user={sessionUser} />
                                </a>
                            )}
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled">Disabled</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
