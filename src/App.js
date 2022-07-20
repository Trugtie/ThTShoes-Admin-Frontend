import "./App.scss";
import Login from "./pages/Login";
import MasterPage from "./pages/MasterPage";
import React from "react";
import { userSelector } from "./redux/selectors";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(userSelector);

  return (
    <div className="App">
      {Object.keys(user).length > 0 ? (
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
