import React from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSignInAlt, FaSignOutAlt, FaHeart } from 'react-icons/fa'; // Importing icons
import { SiAzuredataexplorer } from "react-icons/si";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import logo from "../../assets/logo.png";
export const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);
  
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  const handleShowSavedRecipes = () => {
    try {
      if (cookies.access_token) {
        navigate("/savedRecipes");
      } else {
        toast.error("Please Login to view saved Recipes");
      }
    } catch (error) {
      console.error("An error occurred while displaying the toast notification", error);
    }
  };
  return (
    <div className='navbar'>
      <div className="navbar-left">
         <Link to="/">
        <img src={logo} alt="Logo"  className="logo" />
         </Link>
      </div>
      <div className="navbar-middle">
        <Link className="nav-item" to="/explore" >
          <SiAzuredataexplorer className="icon" />
          <span className="nav-text">Explore</span>
        </Link>
        <Link className="nav-item" to="/createRecipe">
          <FaPlus className="icon" />
          <span className="nav-text">Create Recipe</span>
        </Link>
        <div className="nav-item" onClick={handleShowSavedRecipes}>
          <FaHeart className="icon" />
          <span className="nav-text One">Saved Recipes</span>
        </div>
      </div>
      <div className="navbar-right">
        {
          !cookies?.access_token ? (
            <Link className="nav-item login-logout-signup" to="/auth">
              <FaSignInAlt className="icon" />
              <span className="nav-text">Login/SignUp</span>
            </Link>
          ) : (
            <button className="nav-item login-logout-signup" onClick={logout}>
              <FaSignOutAlt className="icon" />
              <span className="nav-text">Logout</span>
            </button>
          )
        }
      </div>
    </div>
  );
};
