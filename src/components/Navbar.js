import React from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
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
        <Link to="/">Home</Link>
        <Link to="/createRecipe">Create Recipe</Link>
        {
           !cookies?.access_token ?(
              <Link to="/auth">Login/SignUp</Link>
              ):(
            <>
            <Link to="/savedRecipes">Saved Recipes</Link>
            <button onClick={logout}>Logout</button>
            </>
         )
        }
     </div>
  )
}
