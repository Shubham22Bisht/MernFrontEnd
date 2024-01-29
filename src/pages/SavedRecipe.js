import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { BACKEND_URL } from "./services";
import "./SavedRecipes.css";
export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/recipes/savedRecipes/${userID}`,
        );
        console.log(response);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedRecipe();
  },[]);
  return (
    <div className="box">
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe, index) => (
          <li className="recipe" key={recipe._id}>
            <div className="name">
              <h2>{recipe.name}</h2>
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
  )
}
