import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCocktailThunk } from '../../store/cocktails';
import { getAllCocktailsByUserThunk } from '../../store/cocktails';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const CreateCocktailForm = () => {

    const dispatch = useDispatch();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [isAlcoholic, setIsAlcoholic] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [glassType, setGlassType] = useState('');
    const [instructions, setInstructions] = useState('');
    const [measurements, setMeasurements] = useState('');
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let cocktailObj = { name, ingredients, isAlcoholic, category, image, glassType, instructions, measurements };
        console.log(cocktailObj)
        dispatch(createCocktailThunk(cocktailObj));
        history.push("/");
    }

    // const checkUser = (e) => {
    //     e.preventDefault();
    //     if (!user) {
    //         alert("Must be logged on!");
    //     }
    // }
    // class={`nav-link active ${!user ? "disabled" : ""}`}
    return (
        <div>
            <a class="nav-link active" type="button" data-bs-toggle="modal" data-bs-target="#CreateCocktailModal" >Create a Cocktail</a>
            <div class="modal fade" id="CreateCocktailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                {/* <div>
                                    <input placeholder='isAlcoholic' value={isAlcoholic} onChange={(e) => setIsAlcoholic(e.target.value)}></input>
                                </div> */}
                                {/* <div>
                                    <input placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}></input>
                                </div> */}
                                <div>
                                    <input placeholder='Image' value={image} onChange={(e) => setImage(e.target.value)}></input>
                                </div>
                                {/* <div>
                                    <input placeholder='Glass Type' value={glassType} onChange={(e) => setGlassType(e.target.value)}></input>
                                </div> */}
                                <div>
                                    <input placeholder='Instructions' value={instructions} onChange={(e) => setInstructions(e.target.value)}></input>
                                </div>
                                <div>
                                    <input placeholder='Measurements' value={measurements} onChange={(e) => setMeasurements(e.target.value)}></input>
                                </div>
                                <fieldset class="form-group">
                                    <div class="row">
                                        {/* <legend class="col-form-label col-sm-2 pt-0">Alcoholic?</legend> */}
                                        <div class="col-sm-10">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value={true} onChange={(e) => setIsAlcoholic(e.target.value)} />
                                                <label class="form-check-label" for="gridRadios1">
                                                    Alcoholic
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value={false} onChange={(e) => setIsAlcoholic(e.target.value)} />
                                                <label class="form-check-label" for="gridRadios2">
                                                    Virgin
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <div class="form-group col-md-4">
                                    <label for="inputState">Category</label>
                                    <select id="inputState" class="form-control" onChange={(e) => setCategory(e.target.value)}>
                                        <option value="Cocktail">Cocktail</option>
                                        <option value="Sweet">Sweet</option>
                                        <option value="Tropical">Tropical</option>
                                        <option value="Shot">Shot</option>
                                        <option value="Sour">Sour</option>
                                        <option value="Wine">Wine</option>
                                    </select>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="inputState">Glass Type</label>
                                    <select id="inputState" class="form-control" onChange={(e) => setGlassType(e.target.value)}>
                                        <option value="Highball">Highball</option>
                                        <option value="Hurricane">Hurricane</option>
                                        <option value="Collins">Collins</option>
                                        <option value="Shot">Shot</option>
                                        <option value="Rocks">Rocks</option>
                                    </select>
                                </div>

                                {/* <fieldset class="form-group">
                                    <div class="row">
                                        <legend class="col-form-label col-sm-2 pt-0">Glass Type</legend>
                                        <div class="col-sm-10">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" />
                                                <label class="form-check-label" for="gridRadios1">
                                                    Highball
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                                <label class="form-check-label" for="gridRadios2">
                                                    Hurricane
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" />
                                                <label class="form-check-label" for="gridRadios3">
                                                    Collins
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option4" />
                                                <label class="form-check-label" for="gridRadios4">
                                                    Shot
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios5" value="option5" />
                                                <label class="form-check-label" for="gridRadios5">
                                                    Rocks
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset class="form-group">
                                    <div class="row">
                                        <legend class="col-form-label col-sm-2 pt-0">Category</legend>
                                        <div class="col-sm-10">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="gridRadios" id="gridRadios1" value="option1" />
                                                <label class="form-check-label" for="gridRadios1">
                                                    Cocktail
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="gridRadios" id="gridRadios2" value="option2" />
                                                <label class="form-check-label" for="gridRadios2">
                                                    Sweet
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="gridRadios" id="gridRadios1" value="option1" />
                                                <label class="form-check-label" for="gridRadios1">
                                                    Tropical
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="gridRadios" id="gridRadios1" value="option1" />
                                                <label class="form-check-label" for="gridRadios1">
                                                    Shot
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="gridRadios" id="gridRadios1" value="option1" />
                                                <label class="form-check-label" for="gridRadios1">
                                                    Sour
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="gridRadios" id="gridRadios1" value="option1" />
                                                <label class="form-check-label" for="gridRadios1">
                                                    Wine
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset> */}
                                <button type='submit' data-bs-dismiss="modal" class="btn btn-primary"> Submit</button>
                            </form >
                        </div >
                    </div >
                </div >
            </div >
        </div>
    )
}

export default CreateCocktailForm;
