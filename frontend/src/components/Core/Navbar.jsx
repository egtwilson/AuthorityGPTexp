import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-neutral-dark shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-primary-light">
          AuthorityGPT
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-neutral-light hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              {/* Add other authenticated links here, e.g., Profile, Settings */}
              <button
                onClick={handleLogout}
                className="text-neutral-light hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-accent hover:bg-accent-dark focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-neutral-light hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link to="/register" className="text-neutral-light hover:text-white bg-primary hover:bg-primary-dark px-3 py-2 rounded-md text-sm font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
