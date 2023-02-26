import Nav from "./components/Nav";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [editableId, setEditableId] = useState(0);

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
      <Nav navItems={[{ href: "#add", displayText: "Add movie" }]} />
      <main className="container">
        <MovieList onMount={listMovies} movies={movies} editClick={(id)=>setEditableId(id)}/>
        <MovieForm onSuccess={listMovies} editableId={editableId} resetEditable={()=>setEditableId(0)}/>
      </main>
    </>
  );
}

export default App;
