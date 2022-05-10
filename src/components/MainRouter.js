import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SignInPage from "./pages/SignInPage";
import CityPage from "./pages/CityPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./common/ProtectedRoute";
import AdminRoute from "./common/AdminRoute";
import UserPage from "./pages/UserPage";
import ClientPage from "./pages/ClientPage";
import ProjectPage from "./pages/ProjectPage";
import UserProjectsPage from "./pages/UserProjectsPage";
import ReportsPage from "./pages/ReportsPage";

const MainRouter = () => (
  <Router>
    <Box className="App">
      <Routes>
        <Route path="/signin" exact element={<SignInPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cities"
          element={
            <AdminRoute>
              <CityPage />
            </AdminRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AdminRoute>
              <UserPage />
            </AdminRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <AdminRoute>
              <ClientPage />
            </AdminRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <AdminRoute>
              <ProjectPage />
            </AdminRoute>
          }
        />
        <Route
          path="/userProjects"
          element={
            <ProtectedRoute>
              <UserProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Box>
  </Router>
);

export default MainRouter;
