import axios from "axios";
import React, {  useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies,_]=useCookies(["access_token"]);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
    if(cookies.access_token)fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      },{headers:{authorization:cookies.access_token}});
      setSavedRecipes(response.data.savedRecipes)
    } catch (error) {
      console.error(error);
    }
  };
  const isRecipeSaved=(id)=>savedRecipes.includes(id);
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={()=>saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}> {isRecipeSaved(recipe._id)?"Saved":"Save"}</button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
