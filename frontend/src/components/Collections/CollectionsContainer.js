import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCollectionThunk } from "../../store/collections";
import { useSelector } from "react-redux";
import Collections from "./Collections.js"
import { getAllCollectionsByUserThunk } from "../../store/collections";

const CollectionsContainer = () => {

    const dispatch = useDispatch();
    const [collectionName, setCollectionName] = useState('');
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (user) dispatch(getAllCollectionsByUserThunk(user.id))
    }, [dispatch]);

    const handleSubmitCreateCollectionForm = (e) => {
        e.preventDefault();
        const collection = { name: collectionName }
        dispatch(createCollectionThunk(collection));
    }

    return (
        <div>
            <div class="modal fade" id="AddCollectionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Create Collection Form</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmitCreateCollectionForm}>
                                <div class="form-group" style={{ marginBottom: '0.5vh' }}>
                                    <input class="form-control" placeholder="Name of collection" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}></input>
                                </div>
                                <button type="submit" class="btn btn-primary" style={{
                                    display: 'flex',
                                    marginTop: '1vh'
                                }} data-bs-dismiss="modal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {user && <div class="flex-shrink-0 p-3 bg-white" style={{ width: "280px" }}>
                <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                    <span class="fs-5 fw-semibold">My Collections</span>
                </a>
                <ul class="list-unstyled ps-0">
                    <li class="mb-1">
                        <button class="btn align-items-center rounded" data-bs-toggle="modal" data-bs-target="#AddCollectionModal" /*onClick={(e) => handleShowCreateNewCollectionForm(e)}*/>
                            Add Collection
                        </button>
                    </li>
                    <li class="border-top my-3"></li>
                    <Collections />
                </ul>
            </div>}
        </div >
    )
}
export default CollectionsContainer;
