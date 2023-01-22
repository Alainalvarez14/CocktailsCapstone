import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllCocktailsThunk } from "../../store/cocktails";
import { deleteCocktailThunk } from "../../store/cocktails";
import { useHistory } from "react-router";
import { editCocktailThunk } from "../../store/cocktails";

const SpecificCocktail = () => {

    const user = useSelector(state => state.session.user);
    const { drinkId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showEditForm, setShowEditForm] = useState(false);
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [isAlcoholic, setIsAlcoholic] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [glassType, setGlassType] = useState('');
    const [instructions, setInstructions] = useState('');
    const [measurements, setMeasurements] = useState('');


    useEffect(() => {
        dispatch(getAllCocktailsThunk());
    }, [dispatch]);

    const allCocktails = useSelector(state => state.cocktails);
    const specificCocktail = Object.values(allCocktails).filter(cocktail => cocktail.id === Number(drinkId))[0];
    console.log(specificCocktail)

    const handleDelete = (e, cocktail) => {
        e.preventDefault;
        dispatch(deleteCocktailThunk(cocktail));
        history.push("/");
    }

    // const handleShowEditForm = (e, cocktail) => {
    //     e.preventDefault();
    //     setShowEditForm(!showEditForm)
    // }

    const handleSubmitEditForm = () => {
        console.log('inside handleSUbmitEditForm')
        let cocktailObj = { id: specificCocktail.id, name, ingredients, isAlcoholic, category, image, glassType, instructions, measurements };
        console.log(cocktailObj)
        dispatch(editCocktailThunk(cocktailObj));
        setShowEditForm(false);
    }

    return (
        <div style={{
            border: '1px solid blue',
            marginTop: '5px',
            width: '400px',
            height: '600px'
        }}>
            {user && specificCocktail && (
                <div>
                    <div>{specificCocktail.image}</div>
                    <div>{specificCocktail.name}</div>
                    <div>Drink type: {specificCocktail.isAlcoholic.toString()}</div>

                    <div>Glass type: {specificCocktail.glassType}</div>

                    <h4>Ingredients</h4>


                    <div>Instructions: {specificCocktail.instructions}</div>

                </div>
            )}
            {user && specificCocktail && specificCocktail.creatorId === user.id && (
                <div>
                    <button onClick={() => setShowEditForm(!showEditForm)}>EDIT</button>
                    <button onClick={(e) => handleDelete(e, specificCocktail)}>DELETE</button>
                    {/* <button onClick={() => dispatch(deleteCocktailThunk(specificCocktail))}>DELETE</button> */}
                </div>
            )}
            {user && specificCocktail && specificCocktail.creatorId === user.id && showEditForm && (
                <form onSubmit={handleSubmitEditForm}>
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

export default SpecificCocktail;
