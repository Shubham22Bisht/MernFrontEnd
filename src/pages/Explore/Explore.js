import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { BACKEND_URL } from "../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import "./style.css";

export const Explore = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, [cookies.access_token, userID]);

  const saveRecipe = async (recipeID) => {
    if (!cookies.access_token) {
      toast.error("Please log in first to save recipes.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/recipes`,
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const unsaveRecipe = async (recipeID) => {
    if (!cookies.access_token) {
      toast.error("Please log in first to unsave recipes.");
      return;
    }

    try {
      const response = await axios.delete(`${BACKEND_URL}/recipes`, {
        data: { recipeID, userID },
        headers: { authorization: cookies.access_token },
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div className="loading-container">
          <ClipLoader color={"#00BFFF"} loading={loading} size={150} />
        </div>
      ) : (
        <>
          <h1 className="superHeading">Originals</h1>
          <ul className="recipeList">
            {recipes?.map((recipe) => (
              <li className="recipeListItem" key={recipe._id}>
                <div className="heading_saveButton">
                  <h2 className="recipeName">{recipe.name}</h2>
                  <button
                    className="save"
                    onClick={() =>
                      isRecipeSaved(recipe._id)
                        ? unsaveRecipe(recipe._id)
                        : saveRecipe(recipe._id)
                    }
                  >
                    {isRecipeSaved(recipe._id) ? "Unsave" : "Save"}
                  </button>
                </div>

                <div className="instructions">
                  <p className="instructionspara">{recipe.instructions}</p>
                </div>

                <div className="image_ingredients">
                  <div className="ingredients">
                    <h3 className="ingredientsHeading">Ingredients</h3>
                    <ul className="ingredientsList">
                      {recipe?.ingredients?.map((ingredient, index) => (
                        <li key={index} className="ingredientItems">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="imageContainer">
                    <img
                      className="banner"
                      src={recipe.imageUrl ? recipe.imageUrl : recipe.image}
                      alt={recipe.name}
                    />
                  </div>
                </div>

                <p className="cookingTime">
                  Cooking Time: {recipe.cookingTime} minutes
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
