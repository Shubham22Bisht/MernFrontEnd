import React from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
export const Navbar = () => {
   const navigate=useNavigate();
   const [cookies,setCookies]=useCookies(["access_token"]);
   const logout=()=>{
      setCookies("access_token","");
      window.localStorage.removeItem("userID");
      navigate("/auth");
   }
  return (
     <div className='navbar'>
        <Link className="home" to="/">Home</Link>
        <Link className="createRecipe" to="/createRecipe">Create Recipe</Link>
        {
           !cookies?.access_token ?(
              <Link  className="login-logout-signup" to="/auth">Login/SignUp</Link>
              ):(
            <>
            <Link className="savedRecipes" to="/savedRecipes">Saved Recipes</Link>
            <button className="login-logout-signup" onClick={logout}>Logout</button>
            </>
         )
        }
     </div>
  )
}
