import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const App = () => {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} defaultRoute="/" />
            <Route path="/home" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  };

    export default App;