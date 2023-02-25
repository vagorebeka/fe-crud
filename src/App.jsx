import Nav from "./components/Nav";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  const listMovies = () => {
    fetch("https://retoolapi.dev/ZZ9shj/movies", {
      headers: {
        Accept: "application/json",
      },
    }).then(async (response) => {
      const data = await response.json();
      if (response.status === 200) {
        setMovies(data);
      }
    });
  };

  return (
    <>
      <Nav navItems={[{  }]} />
      <main className="container">
        <MovieList onMount={listMovies} movies={movies} />
      </main>
    </>
  );
}

export default App;
