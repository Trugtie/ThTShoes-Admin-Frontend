import "./App.scss";
import Login from "./pages/Login";
import MasterPage from "./pages/MasterPage";
import React from "react";

function App() {
  return (
    <div className="App">
      {localStorage.getItem("user") ? (
        <React.Fragment>
          <MasterPage />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Login />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
