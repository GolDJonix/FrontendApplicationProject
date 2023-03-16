import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dropdown from '../components/DropDown'
import HelloWorld from '../components/HelloWorld'
import Movie from '../components/Movie'
import MovieType from '../types/MovieType'
import {RespostaType} from '../types/RespostaType'
import {Genres} from '../Constants'

const Home = () => {
  const [movies, setMovies] = useState<MovieType[]>([])

  const [movie, setMovie] = useState<MovieType>()

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (selectedOption: string) => {
    setSelectedOption(selectedOption);
  };
  
  useEffect(() => {
    fetch(
      "http://localhost:3000",
      {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json())
    .then((data: RespostaType) => setMovies(data.data))
    .catch((error) => {
      console.error("Error:", error);
    });
  }, [])

  const moviesToShow = selectedOption === "No Filter" 
    ? movies 
    : movies.filter(movie => movie.genres.includes(selectedOption))

  /* const handleChange = (event: { target: { value: string; }; }) => {
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
  }; */

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
    .then((data: RespostaType) => setMovies(data.data))
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  return (
    <div className="App" style={{ background: 'orange' }}>
      <HelloWorld />
      
      <button  
        title='Favorites' 
        onClick={onButtonClickFav}>
          Favorites
      </button>
      
      <button  
        title='FilterGender' 
        onClick={onButtonClickFav}>
          Filter Gender
      </button>
      
      <div>
      <h1>Selected Option: {selectedOption}</h1>
      <Dropdown options={Genres} onSelect={handleSelect} />
    </div>
     {/*  {movies.map((movie) => <Movie movie={movie} setMovie={setMovie} />)} */}

      <div style={{backgroundColor:"yellow",display:"flex"}}>
        <div style={{width:"100%",backgroundColor:'lightcoral'}}>
        {moviesToShow.map((movie) => (
          <Movie key={movie.id} movie={movie} setMovie={setMovie} />
        ))}
        </div>

      </div>

    </div>
  );
}

  
export default Home;