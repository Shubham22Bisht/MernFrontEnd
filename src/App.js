import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import { SavedRecipes } from './pages/SavedRecipe';
import { Home } from './pages/Home';
import { Auth } from './pages/auth/Auth';
import { CreateRecipe } from './pages/CreateRecipe';
import { Navbar } from './components/Navbar';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/createRecipe" element={<CreateRecipe/>}/>
          <Route path="/savedRecipes" element={<SavedRecipes/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
