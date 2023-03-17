import React, { useEffect, useState } from 'react'
import Dropdown from '../components/DropDown'
import Movie from '../components/Movie'
import MovieType from '../types/MovieType'
import {RespostaType} from '../types/RespostaType'
import {Genres} from '../Constants'

const Home = () => {
  const [movies, setMovies] = useState<MovieType[]>([])

  const [selectedOption, setSelectedOption] = useState('')

  const handleSelect = (selectedOption: string) => {
    setSelectedOption(selectedOption)
  }
  
  useEffect(() => {
    setSelectedOption('No Filter')
    fetch(
      'http://localhost:3000',
      {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => response.json())
      .then((data: RespostaType) => setMovies(data.data))
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  const moviesToShow = selectedOption === 'No Filter' 
    ? movies 
    : movies.filter(movie => movie.genres.includes(selectedOption))

  const onButtonClickFav = () => {
    fetch(
      'http://localhost:3000/fav',
      {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => response.json())
      .then((data: RespostaType) => setMovies(data.data))
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div className="App" style={{ background: 'orange' }}>
      
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

      <div style={{backgroundColor:'yellow',display:'flex'}}>
        <div style={{width:'100%',backgroundColor:'lightcoral'}}>
          {moviesToShow.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        
        </div>

      </div>

    </div>
  )
}

  
export default Home