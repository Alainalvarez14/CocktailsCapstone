import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpecificCocktail from "../SpecificCocktail/SpecificCocktail";
import { useHistory } from "react-router-dom";

const Searchbar = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const allCocktails = useSelector(state => state.cocktails);
    const [searchResults, setSearchResults] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (allCocktails) setSearchResults(Object.values(allCocktails).filter(cocktail => cocktail.name.toLowerCase().includes(name.toLowerCase())));
    }, [name]);

    const searchCocktail = (e) => {
        e.preventDefault()
        // setSearchResults(Object.values(allCocktails).filter(cocktail => cocktail.name.toLowerCase().includes(name.toLowerCase())));
        // setName('');
    }

    const openSpecificCocktail = (e, cocktail) => {
        e.preventDefault();
        setName('');
        setSearchResults('');
        history.push(`/drink/${cocktail.id}`);
    }

    return (
        <div>
            <form class="d-flex" role="search" onSubmit={(e) => searchCocktail(e)}>
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={name} onChange={(e) => setName(e.target.value)}></input>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            {searchResults && name && (
                <ul class="list-group"
                    style={{
                        position: 'absolute',
                        width: '18rem',
                        maxHeight: '15rem',
                        overflow: 'auto',
                        zIndex: '100'
                    }}>
                    {searchResults.map(cocktail => {
                        return (
                            <li class="list-group-item" onClick={(e) => openSpecificCocktail(e, cocktail)}>{cocktail.name}</li>
                        )
                    })}
                </ul>
            )
            }
        </div>
    )
}

export default Searchbar;
