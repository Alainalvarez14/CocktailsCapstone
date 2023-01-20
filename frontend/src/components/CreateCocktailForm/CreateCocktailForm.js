import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCocktailThunk } from '../../store/cocktails';

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

    const handleSubmitForm = (e) => {
        e.preventDefault();
        let cocktailObj = { name, ingredients, isAlcoholic, category, image, glassType, instructions, measurements };
        dispatch(createCocktailThunk(cocktailObj));
        setShowCreateForm(false);
    }

    return (
        <div>
            <button onClick={() => setShowCreateForm(!showCreateForm)}>Create Cocktail</button>
            {showCreateForm && (
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
                    <button type='submit'>Submit</button>
                </form>
            )}
        </div>
    )
}

export default CreateCocktailForm;
