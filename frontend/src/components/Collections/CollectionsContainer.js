import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCollectionThunk } from "../../store/collections";
import { useSelector } from "react-redux";
import Collections from "./Collections.js"

const CollectionsContainer = () => {

    const dispatch = useDispatch();
    const [showCreateCollectionForm, setShowCollectionForm] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [showCollections, setShowCollections] = useState(false);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        //dispatch getAllCollections here.
    }, []);

    const handleShowCreateNewCollectionForm = (e) => {
        e.preventDefault();
        setShowCollectionForm(!showCreateCollectionForm);
    }

    const handleSubmitCreateCollectionForm = (e) => {
        e.preventDefault();
        const collection = { name: collectionName }
        dispatch(createCollectionThunk(collection));
        setShowCollectionForm(false);
        setShowCollections(true);
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
                }} onClick={(e) => handleShowCreateNewCollectionForm(e)}>+</button>
                {showCollections && (
                    <Collections />
                )}
            </div>
            {showCreateCollectionForm && (
                <form style={{
                    border: "2px solid green"
                }} onSubmit={handleSubmitCreateCollectionForm}>
                    <div>Create Collection Form</div>
                    <div>
                        <input placeholder="Name of collection" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    )
}

export default CollectionsContainer;
