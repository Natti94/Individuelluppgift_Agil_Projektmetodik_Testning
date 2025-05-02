import { useState } from "react";
/* DETTA ÄR FÖR SKOJ SKULL :) */
export default function MovieForm({ token, onMovieCreated }) {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [description, setDescription] = useState("");
  const [productionYear, setProductionYear] = useState("");
  const [error, setError] = useState(null);

  const handleCreateMovie = async () => {
    try {
      const res = await fetch("/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          director,
          description,
          productionYear: Number(productionYear),
        }),
      });
      if (!res.ok) throw new Error("Kunde inte skapa film");
      const newMovie = await res.json();
      onMovieCreated(newMovie);
      setTitle("");
      setDirector("");
      setDescription("");
      setProductionYear("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h3 className="skapa-film">Skapa ny film</h3>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Regissör"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />
      <input
        type="text"
        placeholder="Beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Produktionsår"
        value={productionYear}
        onChange={(e) => setProductionYear(e.target.value)}
      />
      <button onClick={handleCreateMovie}>Skapa film</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
