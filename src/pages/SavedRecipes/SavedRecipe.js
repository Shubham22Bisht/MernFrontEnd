import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID";
import { BACKEND_URL } from "../services";
import { ClipLoader } from "react-spinners";
import "./style.css";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const userID = useGetUserID();
  useEffect(() => {
    const fetchSavedRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/recipes/savedRecipes/${userID}`,
        );
        console.log(response);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedRecipe();
  }, [userID]);

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <ClipLoader color={"#00BFFF"} loading={loading} size={150} />
        </div>
      ) : (
        <>
          <h1 className="savedRecipeHeading">Saved Recipes</h1>
          <ul className="savedRecipeList">
            {savedRecipes?.map((recipe) => (
              <li className="savedRecipeListItem" key={recipe?._id}>
                <div className="savedRecipeHeading">
                  <h2 className="savedRecipeName">{recipe?.name}</h2>
                </div>
                <div className="savedinstructions">
                  <p>{recipe?.instructions}</p>
                </div>

                <div className="savedRecipe_image_ingredients">
                  <div className="savedingredients">
                    <h3 className="savedingredientsHeading">Ingredients</h3>
                    <ul className="savedingredientsList">
                      {recipe?.ingredients?.map((ingredient, index) => (
                        <li key={index} className="ingredientItems">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="imageContainer">
                    <img
                      className="savedbanner"
                      src={recipe?.imageUrl ? recipe?.imageUrl : recipe?.image}
                      alt={recipe?.name}
                    />
                  </div>
                </div>

                <p className="savedcookingTime">
                  Cooking Time: {recipe?.cookingTime} minutes
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
