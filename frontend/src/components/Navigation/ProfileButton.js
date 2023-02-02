import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useEffect, useRef } from "react";
import "./Navigation.css"
// import OpenModalButton from "../OpenModalButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const openMenu = (e) => {
        e.preventDefault();
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");

    return (
        <div>

            <div onClick={(e) => openMenu(e)}>
                Profile
            </div>
            {showMenu &&
                <ul className={ulClassName} ref={ulRef}>
                    {user ? (
                        <div>
                            <li>{user.username}</li>
                            <li>{user.firstName} {user.lastName}</li>
                            <li>{user.email}</li>
                            <li>
                                <button onClick={logout}>Log Out</button>
                            </li>
                        </div>
                    ) : (
                        <div>
                            <li>
                                <OpenModalMenuItem
                                    itemText="Log In"
                                    onItemClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                />
                            </li>
                            <li>
                                <OpenModalMenuItem
                                    itemText="Sign Up"
                                    onItemClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                            </li>
                        </div>
                    )}
                </ul>
            }
        </div>
    );
}

export default ProfileButton;
