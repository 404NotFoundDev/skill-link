import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeLanding from "./pages/HomeLanding";
import UserPage from "./pages/User";

import "./App.css";
import "./styles/font.css";
import "./styles/index.css";
import "./styles/tailwind.css";

import { Notification } from "./components/utils/Notifications";

const App = function AppWrapper() {
  return (
    <>
      <Notification />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeLanding />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
