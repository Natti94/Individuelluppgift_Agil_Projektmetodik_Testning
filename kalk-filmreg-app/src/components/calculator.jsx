import { useState } from "react";

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const add = () => setResult(Number(num1) + Number(num2));
  const subtract = () => setResult(Number(num1) - Number(num2));
  const multiply = () => setResult(Number(num1) * Number(num2));
  const divide = () =>
    setResult(
      num2 !== "0" ? Number(num1) / Number(num2) : "Kan inte dela med 0"
    );

  return (
    <div className="calculator">
      <div className="input-group">
        <label htmlFor="num1">Första talet:</label>
        <input
          id="num1"
          type="number"
          name="num1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="skriv första talet här.. ex.. 1"
        />
      </div>
      <div className="input-group">
        <label htmlFor="num2">Andra talet:</label>
        <input
          id="num2"
          type="number"
          name="num2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="skriv andra talet här.. ex.. 2"
        />
      </div>
      <div className="buttons">
        <button onClick={add}>+</button>
        <button onClick={subtract}>-</button>
        <button onClick={multiply}>*</button>
        <button onClick={divide}>/</button>
      </div>
      <p>Resultat: {result}</p>
    </div>
  );
}
