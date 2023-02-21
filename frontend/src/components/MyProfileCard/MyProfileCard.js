import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";
// import OpenModalMenuItem from "../OpenModalMenuItem/Navigation/OpenModalMenuItem";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useState } from "react";

const MyProfileCard = () => {

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [email, setEmail] = useState('');


    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const editUser = (e) => {
        e.preventDefault();
        const userObj = { id: user.id, firstName, lastName, username: userName, email, profileImage };
        dispatch(sessionActions.edit(userObj));
    }

    const handleSetEditUser = (e) => {
        e.preventDefault();
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setProfileImage(user.profileImage);
        setUserName(user.userName);
    }

    return (
        <div class="card" style={{ width: '18rem' }}>
            {user && <img src={`${user.profileImage}`} class="card-img-top" alt="..." />}
            {!user && <img src={`https://www.wowktv.com/wp-content/uploads/sites/52/2021/01/bffa689e69f048508c2d333865e136e0.jpg`} class="card-img-top" alt="..." />}

            <ul class="list-group list-group-flush" >
                <li class="list-group-item" style={{
                    display: "flex",
                    marginRight: "auto",
                    marginLeft: 'auto',
                    width: '100%'
                }}>
                    <div style={{ width: '100%' }} >
                        {user ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div>{user.username}</div>
                                <div>{user.firstName} {user.lastName}</div>
                                <div>{user.email}</div>
                            </div>
                        ) : (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                width: '100%'
                            }}>
                                <button class="btn btn-primary" style={{ width: '5.5rem' }}>
                                    <OpenModalMenuItem
                                        itemText="Log In"
                                        modalComponent={<LoginFormModal />}
                                    />
                                </button>
                                <button class="btn btn-primary" style={{ width: '5.5rem' }}>
                                    <OpenModalMenuItem
                                        itemText="Sign Up"
                                        modalComponent={<SignupFormModal />}
                                    />
                                </button>

                            </div>
                        )}
                    </div>
                </li>
            </ul>
            {user && <div class="card-body">
                <div style={{ display: 'flex' }}>
                    <button onClick={logout} class="btn btn-primary" style={{
                        display: "flex",
                        marginRight: "auto",
                        marginLeft: 'auto',
                        width: '11.3vw',
                        maxWidth: '100px',
                        justifyContent: 'center'
                    }}>Log Out</button>
                    <button onClick={(e) => handleSetEditUser(e)} data-bs-toggle="modal" data-bs-target="#EditUserModal" class="btn btn-primary" style={{
                        display: "flex",
                        marginRight: "auto",
                        marginLeft: 'auto',
                        width: '11.3vw',
                        maxWidth: '100px',
                        justifyContent: 'center'
                    }}>Edit User</button>
                </div>
            </div>}

            <div class="modal fade" id="EditUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit User Info!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={editUser}>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Username' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Profile Image' value={profileImage} onChange={(e) => setProfileImage(e.target.value)}></input>
                                </div>
                                <button type='submit' class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyProfileCard;
