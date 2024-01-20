import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { BACKEND_URL } from "./services";
export const CreateRecipe = () => {
  const userID=useGetUserID();
  const [cookies,_]=useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const navigate=useNavigate();
  const handleChange=(event)=>{
      const {name,value}=event.target;
      setRecipe({...recipe,[name]:value});
  }
  const handleIngredientChange=(event,index)=>{
    const {value}=event.target;
    const ingredients=recipe.ingredients;
    ingredients[index]=value;
    setRecipe({...recipe,ingredients});
  }
 
  const addIngredient=()=>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]})
  }
  const handleSubmit=async(event)=>{
    event.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/recipes`,{...recipe},
      {headers:{authorization:cookies.access_token}});
      alert("Recipe Created Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange}/>
        <label htmlFor="ingredients">Ingredients</label>
        {
          recipe.ingredients.map((ingredient,index)=>(
            <input
            key={index}
            type="text"
            name="ingredient"
            value={ingredient }
            onChange={(event)=> handleIngredientChange(event,index)}
            />
          ))
        }
        <button type="button" onClick={addIngredient}>Add Ingredient</button>
        <label htmlFor="instructions">instructions</label>
        <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>
        <label htmlFor="imageUrl">Image Url</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
        <label htmlFor="cookingTime">Cooking Time</label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
};
