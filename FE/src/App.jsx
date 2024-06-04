import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Ini adalah App.jsx</h1>
      <Navbar />
      <HomePage />
    </>
  );
}

export default App;
