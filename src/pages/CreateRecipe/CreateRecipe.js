import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { BACKEND_URL } from "../services";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const removeIngredient = (index) => {
    const ingredients = [...recipe.ingredients];
    ingredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cookies.access_token) {
      toast.error("You must be logged in to create a recipe.");
      return;
    }

    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("instructions", recipe.instructions);
    formData.append("imageUrl", recipe.imageUrl);
    formData.append("cookingTime", recipe.cookingTime);
    formData.append("userOwner", recipe.userOwner);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.post(`${BACKEND_URL}/recipes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
           authorization: cookies.access_token,
        },
      });
      toast.success("Recipe Created Successfully");
      setTimeout(()=>{
        navigate("/explore");
      },1000)
    } catch (error) {
      console.log(error);
      toast.error("Failed to create recipe");
    }
  };

  const onDrop = (acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="create-recipe">
      <ToastContainer />
      <h2 className="heading">Create Recipe</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients:</label>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-input">
            <input
              type="text"
              name="ingredient"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
            <button
              type="button"
              className="remove-ingredient"
              onClick={() => removeIngredient(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="add-ingredient"
          type="button"
          onClick={addIngredient}
        >
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />

        <label htmlFor="imageUpload">Upload Image:</label>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {imageFile ? (
            <p>{imageFile.name}</p>
          ) : (
            <p>Drag 'n' drop an image, or click to select one</p>
          )}
        </div>

        <label htmlFor="cookingTime">Cooking Time(mins):</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />

        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
