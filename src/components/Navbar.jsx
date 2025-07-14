import { useNavigate } from "react-router-dom";
import { showSuccess } from "../utils/toast";
import { useEffect, useState } from "react";
import userAPI from "../api/UserAPI";

export default function Navbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    const res = await userAPI.getCurrentUser();
    setCurrentUser(res.data?.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    showSuccess("Logged out");
    navigate("/login");
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!currentUser) return null;

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold cursor-pointer">Simple Blog</h1>
      <div className="space-x-4">
        {currentUser && (
          <span className="text-white">Welcome, {currentUser.fullName}</span>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
