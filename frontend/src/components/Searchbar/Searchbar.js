import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Searchbar = () => {

    const [name, setName] = useState('');
    const allCocktails = useSelector(state => state.cocktails);
    const [searchResults, setSearchResults] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (allCocktails) setSearchResults(Object.values(allCocktails).filter(cocktail => cocktail.name.toLowerCase().includes(name.toLowerCase())));
    }, [name]);

    const openSpecificCocktail = (e, cocktail) => {
        e.preventDefault();
        setName('');
        setSearchResults('');
        history.push(`/drink/${cocktail.id}`);
    }

    return (
        <div>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={name} onChange={(e) => setName(e.target.value)}></input>
            </form>
            {searchResults && name && (
                <ul class="list-group"
                    style={{
                        position: 'absolute',
                        width: '12.7rem',
                        maxHeight: '15rem',
                        overflow: 'auto',
                        zIndex: '100'
                    }}>
                    {searchResults.map(cocktail => {
                        return (
                            <li style={{
                                cursor: "pointer",
                                display: 'flex'
                            }} class="list-group-item list-group-item-action" onClick={(e) => openSpecificCocktail(e, cocktail)}>
                                <i class="fas fa-cocktail" style={{ marginRight: '2rem', color: 'dodgerblue' }}></i>
                                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cocktail.name}</div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default Searchbar;
