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
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
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
                    {/* <button data-bs-toggle="modal" data-bs-target="#CreateCocktailModal">hhh</button> */}
                </div>
            </div>}


            {/* <div class="modal fade" id="CreateCocktailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Create a Cocktail!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmitForm}>
                                <div>
                                    <input placeholder='Cocktail Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='isAlcoholic' value={isAlcoholic} onChange={(e) => setIsAlcoholic(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Image' value={image} onChange={(e) => setImage(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Glass Type' value={glassType} onChange={(e) => setGlassType(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Instructions' value={instructions} onChange={(e) => setInstructions(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Measurements' value={measurements} onChange={(e) => setMeasurements(e.target.value)}></input>
                                </div>
                                <button type='submit' class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}


        </div>
    )
}

export default MyProfileCard;
