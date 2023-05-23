import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import { useState } from "react";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              welcomeText="Welcome to the Connectify"
              detailsText="Please sign in or sign up"
            />
          }
        />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
