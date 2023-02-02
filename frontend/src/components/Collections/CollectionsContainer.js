
// <div class="flex-shrink-0 p-3 bg-white" style={{ width: "280px" }}>
//     <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
//         {/* <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg> */}
//         <span class="fs-5 fw-semibold">My Collections</span>
//     </a>
//     <ul class="list-unstyled ps-0">
//         <li class="mb-1">
//             <button class="btn align-items-center rounded" onClick={(e) => handleCreateNewCollection(e)}>
//                 Add Collection
//             </button>
//             <div class="collapse" id="home-collapse">
//                 <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                     <li><a href="#" class="link-dark rounded">Overview</a></li>
//                     <li><a href="#" class="link-dark rounded">Updates</a></li>
//                     <li><a href="#" class="link-dark rounded">Reports</a></li>
//                 </ul>
//             </div>
//         </li>
//         <li class="mb-1">
//             <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
//                 Dashboard
//             </button>
//             <div class="collapse" id="dashboard-collapse">
//                 <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                     <li><a href="#" class="link-dark rounded">Overview</a></li>
//                     <li><a href="#" class="link-dark rounded">Weekly</a></li>
//                     <li><a href="#" class="link-dark rounded">Monthly</a></li>
//                     <li><a href="#" class="link-dark rounded">Annually</a></li>
//                 </ul>
//             </div>
//         </li>
//         <li class="mb-1">
//             <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
//                 Orders
//             </button>
//             <div class="collapse" id="orders-collapse">
//                 <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                     <li><a href="#" class="link-dark rounded">New</a></li>
//                     <li><a href="#" class="link-dark rounded">Processed</a></li>
//                     <li><a href="#" class="link-dark rounded">Shipped</a></li>
//                     <li><a href="#" class="link-dark rounded">Returned</a></li>
//                 </ul>
//             </div>
//         </li>
//         <li class="border-top my-3"></li>
//         <li class="mb-1">
//             <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
//                 Account
//             </button>
//             <div class="collapse" id="account-collapse">
//                 <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//                     <li><a href="#" class="link-dark rounded">New...</a></li>
//                     <li><a href="#" class="link-dark rounded">Profile</a></li>
//                     <li><a href="#" class="link-dark rounded">Settings</a></li>
//                     <li><a href="#" class="link-dark rounded">Sign out</a></li>
//                 </ul>
//             </div>
//         </li>



//                 </ul>
//             </div>
//         </div >
//     )
// }

// export default CollectionsContainer;

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
        setShowCollectionForm(true);
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
            {showCreateCollectionForm && (
                // <form style={{
                //     border: "2px solid green"
                // }} onSubmit={handleSubmitCreateCollectionForm}>
                //     <div>Create Collection Form</div>
                //     <div>
                //         <input placeholder="Name of collection" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}></input>
                //     </div>
                //     <button type="submit">Submit</button>
                // </form>

                <div class="modal fade" id="addCollectionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Create Collection Form</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={handleSubmitCreateCollectionForm}>
                                    <input placeholder="Name of collection" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}></input>
                                    <button type="submit" class="btn btn-primary" style={{
                                        display: 'flex',
                                        marginTop: '1vh'
                                    }} data-bs-dismiss="modal">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div class="flex-shrink-0 p-3 bg-white" style={{ width: "280px" }}>
                <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                    {/* <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg> */}
                    <span class="fs-5 fw-semibold">My Collections</span>
                </a>
                <ul class="list-unstyled ps-0">
                    <li class="mb-1">
                        <button class="btn align-items-center rounded" data-bs-toggle="modal" data-bs-target="#addCollectionModal" onClick={(e) => handleShowCreateNewCollectionForm(e)}>
                            Add Collection
                        </button>
                    </li>
                    {/* <li class="mb-1">
                        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                            Dashboard
                        </button>
                        <div class="collapse" id="dashboard-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-dark rounded">Overview</a></li>
                                <li><a href="#" class="link-dark rounded">Weekly</a></li>
                                <li><a href="#" class="link-dark rounded">Monthly</a></li>
                                <li><a href="#" class="link-dark rounded">Annually</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                            Orders
                        </button>
                        <div class="collapse" id="orders-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-dark rounded">New</a></li>
                                <li><a href="#" class="link-dark rounded">Processed</a></li>
                                <li><a href="#" class="link-dark rounded">Shipped</a></li>
                                <li><a href="#" class="link-dark rounded">Returned</a></li>
                            </ul>
                        </div>
                    </li> */}
                    <li class="border-top my-3"></li>
                    {/* <li class="mb-1">
                        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                            <Collections />
                        </button>
                    </li> */}
                    <Collections />
                </ul>
            </div>
        </div >
    )
}
export default CollectionsContainer;
