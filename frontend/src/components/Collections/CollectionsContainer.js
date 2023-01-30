import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCollectionThunk } from "../../store/collections";
import { useSelector } from "react-redux";
import Collections from "./Collections.js"
import { getAllCollectionsByUserThunk } from "../../store/collections";

const CollectionsContainer = () => {

    const dispatch = useDispatch();
    const [showCreateCollectionForm, setShowCollectionForm] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [showCollections, setShowCollections] = useState(true);
    const user = useSelector(state => state.session.user);
    const allCollections = useSelector(state => state.collections);

    useEffect(() => {
        if (user) dispatch(getAllCollectionsByUserThunk(user.id))
    }, [dispatch]);

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
                width: '165px',
            }}>
                <button style={{
                    border: '1px solid red',
                    borderRadius: '20px',
                }} onClick={(e) => handleShowCreateNewCollectionForm(e)}>+</button>
                <div>My Cocktail Collections</div>
                {showCollections && (
                    // <div>{Object.values(allCollections).map(collection => {
                    //     <Collections id={collection.id} name={collection.name} /*drink */ />
                    // })}</div>
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
