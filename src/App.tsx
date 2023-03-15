import './App.css';
import { FC, useEffect, useState } from 'react'
import HelloWorld from './components/HelloWorld'
import List from './components/List'
import Movie from './types/Movie';

type RespostaType = {
  data: Movie[]
  message: string
  meta: any
}

const App: FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [idValue,setIdValue] = useState<string>()
  const [movie, setMovie] = useState<Movie[]>()

  useEffect(() => {
    fetch(
      "http://localhost:3000",
      {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },/* usecallback, useeffect e ussememo */
      }
    ).then((response) => response.json())
    .then((data: RespostaType) => {
      setMovies(data.data)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, [])

  const handleChange = (event: { target: { value: string; }; }) => {
    const result = event.target.value;
    console.log(typeof result,result)
    fetch(
      `http://localhost:3000/${idValue}`,
      {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json())
    .then((data: RespostaType) => {
      setMovie(data.data)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    setIdValue(result);
    console.log(movie)
  };

  const onButtonClickFav = () => {
    fetch(
      "http://localhost:3000/fav",
      {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json())
    .then((data: RespostaType) => {
      setMovies(data.data)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  return (
    <div className="App">
      <HelloWorld />
      <input 
        type="number"
        name="setId"
        value={idValue}
        placeholder="Procura um filme por id"
        onChange={handleChange} />
      {/* <button 
        title='MoviesList' 
        onClick={onButtonClick}>
          Movies List
      </button> */}
      <button  
        title='Favorites' 
        onClick={onButtonClickFav}>
          Favorites
      </button>
      
      <List movies={movies} />
    </div>
  );
}

  
  /* 
fetch("http://example.com/movies.json")
  .then((response) => response.json())
  .then((data) => console.log(data));
 */

export default App;