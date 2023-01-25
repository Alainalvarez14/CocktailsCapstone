import { useState } from "react";
import { useDispatch } from "react-redux";

const Likes = () => {

    const dispatch = useDispatch();
    const [likes, setLikes] = useState(0);
    const [notLikes, setNotLikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    }

    const handleNotLike = () => {
        setLikes(likes + 1);
    }

    return (
        <div>
            <button onClick={() => handleLike()}>Like {likes}</button>
            <button onClick={() => handleNotLike()}>Not Like {notLikes}</button>
        </div>
    )
}
export default Likes;
