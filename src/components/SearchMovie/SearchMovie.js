import "./SearchMovie.css";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Loading from "../Loading";
import Error from "../Error";
import SingleMovie from "./SingleMovie";
import { nanoid } from "nanoid";
const url = `https://www.omdbapi.com/?apikey=thewdb&s=`;

const SearchMovie = () => {
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [year, setYear] = useState("");
    const [type, setType] = useState("");

    const handleSearchText = (event) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchMovie();
    };
    const fetchMovie = async () => {
        setIsLoading(true);
        try {
            let response = await fetch(`${url}${searchText}`);
            let data = await response.json();
            const { Search, Response, totalResults } = data;
            let newMovies = Search;

            //filter year :
            if (year) {
                newMovies = newMovies.filter((movie) => movie.Year === year);
            }
            //filter type :
            if (type) {
                newMovies = newMovies.filter((movie) => movie.Type === type);
            }
            setMovies(newMovies);
        } catch (error) {
            setIsError(true);
            console.log(error);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="searchMovie">
                <section className="section-center searchMovie-center">
                    <Loading />
                </section>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="searchMovie">
                <section className="section-center searchMovie-center">
                    <Error />
                </section>
            </div>
        );
    }
    return (
        <div className="searchMovie">
            <section className="section-center searchMovie-center">
                <form onSubmit={handleSubmit}>
                    <header>
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearchText}
                            id="search-text"
                        />
                        <button className="btn" type="submit" id="submit-btn">
                            <IoMdSearch />
                        </button>
                    </header>
                    <section className="filter-btns">
                        <div className="filter-year">
                            <label htmlFor="search-year">search year</label>
                            <input
                                min="1990"
                                max={new Date().getFullYear()}
                                type="range"
                                id="search-year"
                                value={year}
                                onChange={(event) =>
                                    setYear(event.target.value)
                                }
                            />
                            <span>{year}</span>
                        </div>
                        <div className="filter-type">
                            <label htmlFor="search-type">search type</label>
                            <select
                                name="search-type"
                                id="search-type"
                                value={type}
                                onChange={(event) =>
                                    setType(event.target.value)
                                }
                            >
                                <option style={{ display: "none" }}></option>
                                <option>series</option>
                                <option>movie</option>
                            </select>
                        </div>
                    </section>
                </form>
                <div className="movies column column-3">
                    {movies.map((movie, index) => {
                        return <SingleMovie {...movie} key={nanoid()} />;
                    })}
                </div>
            </section>
        </div>
    );
};

export default SearchMovie;
