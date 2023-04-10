import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Login from './components/Login'
// import Dashboard from "./components/Dashboard"
import Route from "./route";
import { BrowserRouter } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// const code = new URLSearchParams(window.location.search).get("code")
function App() {
  // const location = useLocation();
  // const code = location.search.split("=")[1];
  // localStorage.setItem("code", code);

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}

export default App;
