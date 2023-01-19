import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useEffect, useRef } from "react";
import "./Navigation.css"

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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");

    return (
        <div>

            <button onClick={(e) => openMenu(e)}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu &&
                <ul className={ulClassName} ref={ulRef}>
                    <li>{user.username}</li>
                    <li>{user.firstName} {user.lastName}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            }

        </div>
    );
}

export default ProfileButton;
