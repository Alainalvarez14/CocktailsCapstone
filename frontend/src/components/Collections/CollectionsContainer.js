// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { createCollectionThunk } from "../../store/collections";
// import { useSelector } from "react-redux";
// import Collections from "./Collections.js"
// import { getAllCollectionsByUserThunk } from "../../store/collections";

// const CollectionsContainer = () => {

//     const dispatch = useDispatch();
//     const [showCreateCollectionForm, setShowCollectionForm] = useState(false);
//     const [collectionName, setCollectionName] = useState('');
//     const [showCollections, setShowCollections] = useState(true);
//     const user = useSelector(state => state.session.user);
//     const allCollections = useSelector(state => state.collections);

//     useEffect(() => {
//         if (user) dispatch(getAllCollectionsByUserThunk(user.id))
//     }, [dispatch]);

//     const handleShowCreateNewCollectionForm = (e) => {
//         e.preventDefault();
//         setShowCollectionForm(!showCreateCollectionForm);
//     }

//     const handleSubmitCreateCollectionForm = (e) => {
//         e.preventDefault();
//         const collection = { name: collectionName }
//         dispatch(createCollectionThunk(collection));
//         setShowCollectionForm(false);
//         setShowCollections(true);
//     }

//     return (
//         <div>
//             {<div style={{
//                 border: '2px solid blue',
//                 height: '200px',
//                 width: '165px',
//             }}>
//                 <button style={{
//                     border: '1px solid red',
//                     borderRadius: '20px',
//                 }} onClick={(e) => handleShowCreateNewCollectionForm(e)}>+</button>
//                 <div>My Cocktail Collections</div>
//                 {showCollections && (
//                     // <div>{Object.values(allCollections).map(collection => {
//                     //     <Collections id={collection.id} name={collection.name} /*drink */ />
//                     // })}</div>
//                     <Collections />
//                 )}
//             </div>
//             {showCreateCollectionForm && (
//                 <form style={{
//                     border: "2px solid green"
//                 }} onSubmit={handleSubmitCreateCollectionForm}>
//                     <div>Create Collection Form</div>
//                     <div>
//                         <input placeholder="Name of collection" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}></input>
//                     </div>
//                     <button type="submit">Submit</button>
//                 </form>
//             )} */}
//         // <div class="flex-shrink-0 p-3 bg-white" style={{ width: "280px" }}>
//         //     <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
//         //         {/* <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg> */}
//         //         <span class="fs-5 fw-semibold">My Collections</span>
//         //     </a>
//         //     <ul class="list-unstyled ps-0">
//         //         <li class="mb-1">
//         //             <button class="btn align-items-center rounded" onClick={(e) => handleCreateNewCollection(e)}>
//         //                 Add Collection
//         //             </button>
//         //             <div class="collapse" id="home-collapse">
//         //                 <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//         //                     <li><a href="#" class="link-dark rounded">Overview</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Updates</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Reports</a></li>
//         //                 </ul>
//         //             </div>
//         //         </li>
//         //         <li class="mb-1">
//         //             <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
//         //                 Dashboard
//         //             </button>
//         //             <div class="collapse" id="dashboard-collapse">
//         //                 <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//         //                     <li><a href="#" class="link-dark rounded">Overview</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Weekly</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Monthly</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Annually</a></li>
//         //                 </ul>
//         //             </div>
//         //         </li>
//         //         <li class="mb-1">
//         //             <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
//         //                 Orders
//         //             </button>
//         //             <div class="collapse" id="orders-collapse">
//         //                 <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//         //                     <li><a href="#" class="link-dark rounded">New</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Processed</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Shipped</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Returned</a></li>
//         //                 </ul>
//         //             </div>
//         //         </li>
//         //         <li class="border-top my-3"></li>
//         //         <li class="mb-1">
//         //             <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
//         //                 Account
//         //             </button>
//         //             <div class="collapse" id="account-collapse">
//         //                 <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//         //                     <li><a href="#" class="link-dark rounded">New...</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Profile</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Settings</a></li>
//         //                     <li><a href="#" class="link-dark rounded">Sign out</a></li>
//         //                 </ul>
//         //             </div>
//         //         </li>
//                     {showCreateCollectionForm && (
//                         <form style={{
//                             border: "2px solid green"
//                         }} onSubmit={handleSubmitCreateCollectionForm}>
//                             <div>Create Collection Form</div>
//                             <div>
//                                 <input placeholder="Name of collection" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}></input>
//                             </div>
//                             <div>
//                                 <input placeholder="Drinks to add" value={drinksToAdd} onChange={(e) => setDrinksToAdd(e.target.value)}></input>
//                             </div>
//                             <button type="submit">Submit</button>
//                         </form>
//                     )}
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
                <form style={{}}>
                    <div>
                        <input placeholder="Name of collection" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}></input>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div >
    )
}
export default CollectionsContainer;
