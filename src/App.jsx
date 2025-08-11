import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";
import Navbar from "./components/Navbar/Navbar";
import Redeem from "./pages/Redeem";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
        />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
        />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
        />
        <Route path="/redeem" element={
          <PrivateRoute>
            <Redeem />
          </PrivateRoute>
        }
        />

        <Route path="*" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
        />
      </Routes>
    </Router>
  );
}

export default App;