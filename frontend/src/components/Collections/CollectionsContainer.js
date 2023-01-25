import { useState } from "react";
import { useDispatch } from "react-redux";

const CollectionsContainer = () => {

    const dispatch = useDispatch();
    const [showCreateCollectionForm, setShowCollectionForm] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [drinksToAdd, setDrinksToAdd] = useState('');

    const handleCreateNewCollection = (e) => {
        e.preventDefault();
        setShowCollectionForm(!showCreateCollectionForm);
    }

    const handleSubmitCreateCollectionForm = () => {
        const collection = { name: collectionName, drinksToAdd }
        // dispatch(createCollectionThunk(collection));
    }

    return (
        <div>
            <div style={{
                border: '2px solid blue',
                height: '200px',
                width: '150px',
            }}>
                <button style={{
                    border: '1px solid red',
                    borderRadius: '20px',
                }} onClick={(e) => handleCreateNewCollection(e)}>+</button>
            </div>
            {showCreateCollectionForm && (
                <form style={{
                    border: "2px solid green"
                }} onSubmit={handleSubmitCreateCollectionForm}>
                    <div>Create Collection Form</div>
                    <div>
                        <input placeholder="Name of collection" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}></input>
                    </div>
                    <div>
                        <input placeholder="Drinks to add" value={drinksToAdd} onChange={(e) => setDrinksToAdd(e.target.value)}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    )
}

export default CollectionsContainer;
