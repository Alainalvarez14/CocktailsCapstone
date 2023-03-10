import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCocktailThunk } from '../../store/cocktails';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getAllCocktailsThunk } from '../../store/cocktails';

const CreateCocktailForm = () => {

    const dispatch = useDispatch();
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
    let disabled = true;

    const handleSubmitForm = (e) => {
        e.preventDefault();
        // $('#CreateCocktailModal').modal('hide')
        let cocktailObj = { name, ingredients, isAlcoholic, category, image, glassType, instructions, measurements };
        console.log(cocktailObj);

        dispatch(createCocktailThunk(cocktailObj));
        setName('');
        setIngredients('');
        setIsAlcoholic('');
        setCategory('');
        setImage('');
        setGlassType('');
        setInstructions('');
        setMeasurements('');

        history.push("/");
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
        console.log(image);
    };

    return (
        <div>
            <a class="nav-link active" type="button" data-bs-toggle="modal" data-bs-target="#CreateCocktailModal" >Create a Cocktail</a>
            <div class="modal fade" id="CreateCocktailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Create a Cocktail!</h1>
                                <small>Please complete all fields</small>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => handleSubmitForm(e)}>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Cocktail Name' value={name} onChange={(e) => setName(e.target.value)} required></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)} required></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input type="file" class="form-control" placeholder='Image' onChange={updateFile} required></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Instructions' value={instructions} onChange={(e) => setInstructions(e.target.value)} required></input>
                                </div>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder='Measurements' value={measurements} onChange={(e) => setMeasurements(e.target.value)} required></input>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="inputState">Is Alcoholic?</label>
                                    <select id="inputState" class="form-control form-select" onChange={(e) => setIsAlcoholic(e.target.value)}>
                                        <option value="" selected>choose one...</option>
                                        <option value="true" >True</option>
                                        <option value="false" >False</option>
                                    </select>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="inputState">Category</label>
                                    <select id="inputState" class="form-control form-select" onChange={(e) => setCategory(e.target.value)}>
                                        <option value="" selected>choose one...</option>
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
                                    <select id="inputState" class="form-control form-select" onChange={(e) => setGlassType(e.target.value)}>
                                        <option value="" selected>choose one...</option>
                                        <option value="Highball">Highball</option>
                                        <option value="Hurricane">Hurricane</option>
                                        <option value="Collins">Collins</option>
                                        <option value="Shot">Shot</option>
                                        <option value="Rocks">Rocks</option>
                                    </select>
                                </div>
                                {name && ingredients && image && instructions && measurements && isAlcoholic && category && glassType && (
                                    disabled = false
                                )}
                                <button type='submit' data-bs-dismiss="modal" class="btn btn-primary" disabled={disabled}> Submit</button>
                            </form >
                        </div >
                    </div >
                </div >
            </div >
        </div>
    )
}

export default CreateCocktailForm;
