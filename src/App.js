import { useState,useEffect } from "react";

// a58e67df
import MovieCard from './MovieCard.jsx';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = "http://www.omdbapi.com?apikey=a58e67df";

/*
const movie1 = {
    "Title": "Spin",
    "Year": "2021",
    "imdbID": "tt12969826",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNGI1N2Y1NzMtMTFhOC00NWYxLWFmZmMtNmUzZmY3Y2MxYWEyXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_SX300.jpg"
    // "Poster": "N/A"
}
*/

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    
    useEffect(() => {
        searchMovies('Spin');
    },[]);

    return(
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => setsearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)} 
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie ) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )
            }

        </div>
    )
}

export default App;