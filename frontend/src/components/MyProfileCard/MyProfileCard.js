import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";
// import OpenModalMenuItem from "../OpenModalMenuItem/Navigation/OpenModalMenuItem";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

const MyProfileCard = () => {

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div class="card" style={{ width: '18rem' }}>
            <img src={'https://www.nicepng.com/png/detail/53-530608_al-pacino-portrait-scarface-tony-montana-domestic-poster.png'} class="card-img-top" alt="..." />
            {/* <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div> */}
            <ul class="list-group list-group-flush" >
                <li class="list-group-item" style={{
                    display: "flex",
                    marginRight: "auto",
                    marginLeft: 'auto',
                    width: '100%'
                }}>
                    <div style={{ width: '100%' }} >
                        {user ? (
                            <div>
                                <div>{user.username}</div>
                                <div>{user.firstName} {user.lastName}</div>
                                <div>{user.email}</div>
                                {/* <div>
                                    <button onClick={logout} class="btn btn-primary">Log Out</button>
                                </div> */}
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
                                        // onItemClick={closeMenu}
                                        modalComponent={<LoginFormModal />}
                                    />
                                </button>
                                <button class="btn btn-primary" style={{ width: '5.5rem' }}>
                                    <OpenModalMenuItem
                                        itemText="Sign Up"
                                        // onItemClick={closeMenu}
                                        modalComponent={<SignupFormModal />}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </li>
                {/* <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li> */}
            </ul>
            {user && <div class="card-body">
                {/* <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a> */}
                <div>
                    <button onClick={logout} class="btn btn-primary" style={{
                        display: "flex",
                        marginRight: "auto",
                        marginLeft: 'auto',
                    }}>Log Out</button>
                </div>
            </div>}
        </div>
    )
}

export default MyProfileCard;
