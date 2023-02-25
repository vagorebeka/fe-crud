import { useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const { movies, onMount, modifyClick } = props;
  useEffect(() => {
    onMount();
  }, []);
  const cardList = [];
  movies.forEach((movie) => {
    cardList.push(<MovieCard key={movie.id} movie={movie} afterDelete={onMount} modifyClick={modifyClick} />);
  });
  return (
    <section>
      <h2>List of movies</h2>
      <div className="row gy-4">{cardList}</div>
    </section>
  );
}

export default MovieList;
