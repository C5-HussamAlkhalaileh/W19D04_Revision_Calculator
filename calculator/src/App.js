import "./App.css";
import { useState } from "react";

//* 1] Implement the clear button: should return every state to the default state [empty state]
//* 2] Implement sign(-/+) button: should give a sign to the number -> not applied on operators
//* 3] Implement delete button: backspace -> deletes the last entered element

function App() {
  const [result, setResult] = useState(localStorage.getItem("result") || "");
  const [expression, setExpression] = useState([]);
  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const operations = ["-", "=", "+", "/", "x"];

  const handleClick = (value) => {
    console.log("value: ", value);
    // const newExp = expression.push(value);
    setExpression([...expression, value]);
  };

  // [1,-,6,*,7,7] -> 1 - 6 * 77

  // 1] join(""); -> "1-6*77"
  //  d-> digits
  // 2] split(/\D/g) -> ["1","-","6","*","77"]

  const handleResult = () => {
    console.log(expression);
    console.log(expression.join(""));
    console.log(expression.join("").split(/(\D)/g));
    const result = expression
      .join("")
      .split(/(\D)/g)
      .map((element, index) => {
        return element.match(/[+,-,x,/]/g) ? element : parseInt(element);
      })
      .reduce((acc, value, index, array) => {
        switch (value) {
          case "+":
            return (acc += array[index + 1]);
          case "-":
            return (acc -= array[index + 1]);
          case "x":
            return (acc *= array[index + 1]);
          case "/":
            return (acc /= array[index + 1]);
          default:
            return acc;
        }
      });

    setResult(result);
    localStorage.setItem("result", JSON.stringify(result));
    console.log(result);
  };

  return (
    <div className="App">
      <h3 className="display">{result}</h3>
      <p className="expression">{expression}</p>
      <section className="panel">
        <section className="numbers">
          {numbers.map((number, index) => {
            return (
              <button
                value={number}
                key={index}
                className="number"
                onClick={(e) => {
                  handleClick(e.target.value);
                }}
              >
                {number}
              </button>
            );
          })}
        </section>

        <section className="operators">
          {operations.map((opr, i) => {
            return (
              <button
                key={i}
                className="operator"
                onClick={() => {
                  opr === "=" ? handleResult() : handleClick(opr);
                }}
              >
                {opr}
              </button>
            );
          })}
        </section>
      </section>
    </div>
  );
}

export default App;
