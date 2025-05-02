import { useState } from "react";
import MovieForm from "./MovieForm";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    try {
      setError(null);
      const res = await fetch("/token-service/v1/request-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Inloggning misslyckades: ${errorText}`);
      }
      const fetchedToken = await res.text();
      setToken(fetchedToken);
      const movieRes = await fetch("/movies", {
        headers: { Authorization: `Bearer ${fetchedToken}` },
      });
      if (!movieRes.ok) {
        const errorText = await movieRes.text();
        throw new Error(`Kunde inte hämta filmer: ${errorText}`);
      }
      const moviesData = await movieRes.json();
      setMovies(moviesData);
    } catch (error) {
      console.error("Fel:", error.message);
      setError(error.message);
    }
  };

  const handleMovieCreated = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Användarnamn.. Skriv 'AgilaGrupp3'"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Lösenord.. Skriv 'AgilaGrupp3'"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Logga in och hämta filmer</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {token && <MovieForm token={token} onMovieCreated={handleMovieCreated} />}
      <ul>
        {movies.map((m) => (
          <li key={m.id}>
            <strong>{m.title}</strong>
            <p>Regissör: {m.director}</p>
            <p>Beskrivning: {m.description}</p>
            <p>Produktionsår: {m.productionYear}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
