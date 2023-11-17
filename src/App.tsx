import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="d-flex flex-column justify-content-between bg-secondary vh-100">
      <div className="bg-danger py-3">
        <h1>Hangman</h1>
      </div>

      <div className="row">
        <div className="col-5 bg-info">hangman guy here</div>

        <div className="col-7 bg-light">word here</div>
      </div>

      <div className="bg-success">
        <div>letters here</div>
      </div>
    </div>
  );
}

export default App;
