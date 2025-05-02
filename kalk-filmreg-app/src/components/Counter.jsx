import { useState } from "react";

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const add = () => setResult(Number(num1) + Number(num2));
  const subtract = () => setResult(Number(num1) - Number(num2));
  const multiply = () => setResult(Number(num1) * Number(num2));
  const divide = () => setResult(num2 !== "0" ? Number(num1) / Number(num2) : "Kan inte dela med 0");

  return (
    <div>
      <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
      <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
      <button onClick={multiply}>*</button>
      <button onClick={divide}>/</button>
      <p>Resultat: {result}</p>
    </div>
  );
}