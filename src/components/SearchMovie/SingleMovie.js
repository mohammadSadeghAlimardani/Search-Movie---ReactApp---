import "./SingleMovie.css";

const SingleMovie = (props) => {
    const { Poster, Title, Year, imdbID } = props;
    return (
        <article className="single-movie">
            <img src={Poster} alt={Title} />
            <section className="info">
                <h3>{Title}</h3>
                <h4>{Year}</h4>
            </section>
        </article>
    );
};

export default SingleMovie;
