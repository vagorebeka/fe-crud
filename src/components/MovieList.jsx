import { useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const { movies, onMount, editClick } = props;
  useEffect(() => {
    onMount();
  }, []);
  const cardList = [];
  movies.forEach((movie) => {
    cardList.push(<MovieCard key={movie.id} movie={movie} afterDelete={onMount} editClick={editClick} />);
  });
  return (
    <section>
      <h2>List of movies</h2>
      <div className="row gy-4">{cardList}</div>
    </section>
  );
}

export default MovieList;
