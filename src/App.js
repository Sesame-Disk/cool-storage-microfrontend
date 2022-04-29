import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to=".">Home</Link>
        </li>
        <li>
          <Link to="es">Spanish</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<p>Hello World!</p>} />
        <Route path="es" element={<p>Hola Mundo!</p>} />
      </Routes>
    </div>
  );
}

export default App;
