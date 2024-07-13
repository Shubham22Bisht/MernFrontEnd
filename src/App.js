import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import { SavedRecipes } from './pages/SavedRecipes/SavedRecipe.js';
import { Explore } from './pages/Explore/Explore.js';
import { Auth } from './pages/auth/Auth';
import { CreateRecipe } from './pages/CreateRecipe/CreateRecipe.js';
import { Navbar } from './components/Navbar/Navbar.js';
import { GetStarted } from './pages/Landing/GetStarted.js';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<GetStarted/>} />
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/createRecipe" element={<CreateRecipe/>}/>
          <Route path="/savedRecipes" element={<SavedRecipes/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
