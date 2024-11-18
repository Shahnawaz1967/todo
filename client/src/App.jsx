import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage"
import ProjectDetail from "./pages/ProjectDetail"; 
import Navbar from "./components/Navbar";
 


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/project-page" element={<ProjectPage/>} />
        </Routes>

      </Router>
    </AuthProvider>
  );
};

export default App;
