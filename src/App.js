// import logo from './logo.svg';
import React,{useEffect, useState} from "react";
import './App.css';
import Recipe from './Recipe';

function App() {
  const APP_ID = "fe1e1a85";
  const APP_KEY = "ec099ab7b0ba73c5681939633e1ccc15";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(' ');
  const [query, setQuery] = useState('banana');

    useEffect(() => {
    getRecipes();
    }, [query]);

  const getRecipes = async () =>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`) 
  const data = await response.json(); 
  setRecipes(data.hits);
  console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
   
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
            <div className="rice">
              <p className="rice_p">Search For Your Favorite Food Recipe. E.g banana, chicken, apple, groundnut, etc.</p>
            </div>

          <nav className="nav_div">
              <ul className= "jeri"> 
                <li><span className= "spa"> For More Quality Recipe</span>  <a href= "/">Contact us</a></li>
              </ul>
            </nav>

     <form onSubmit={getSearch} className="search-form">
       <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
       <button className="search-button" type="submit">search</button>

     </form>
     <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
