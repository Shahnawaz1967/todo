import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-emerald-500 p-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold">
        <Link to="/">Todo App</Link>
      </h1>
      <div>
        {user ? (
          <>
            <button
              className="px-4 py-2 bg-white text-emerald-500 rounded hover:bg-emerald-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-emerald-500 rounded hover:bg-emerald-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="ml-4 px-4 py-2 bg-white text-emerald-500 rounded hover:bg-emerald-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
