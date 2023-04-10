import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const code = location.search.split("=")[1];
  localStorage.setItem("code", code);
  return code ? <Dashboard code={code} /> : <Login />;

  // const code = new URLSearchParams(window.location.search).get("code")

  // <>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Login />} defaultRoute="/" />
  //       <Route path="/home" element={<Dashboard />} />
  //     </Routes>
  //   </BrowserRouter>
  // </>
};

export default App;
