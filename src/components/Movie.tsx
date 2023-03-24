import React, { FC } from 'react'
import MovieType from '../types/MovieType'
import { useNavigate } from 'react-router-dom'
import { toggleFavoriteMovie } from '../API/Index'

const MovieComponent: FC<{
  movie: MovieType
  isFav: boolean
  refresh: () => void
}> = ({movie,isFav,refresh}) => {
  const navigate = useNavigate()

  const onButtonClick = () => navigate(`/movie/${movie.id}`)

  const handleFav = async (idFav: number) => {
    await toggleFavoriteMovie(idFav)
    refresh()
  }

  return (  
    <div
      key={movie.id}
      style={{
        border:'solid 1px black',
        margin:'5px 0px',
        padding:'10px',
        background: isFav === true ?  'green' : 'tomato'
      }}
      
    >
      {`${movie.id} - ${movie.title} - ${movie.year} `}
      <button onClick={ () => handleFav(movie.id)}>{isFav === false ? 'AddFav' : 'RemFav'}</button>
      <button onClick={onButtonClick}>Details</button>
    </div>
  )
}

export default MovieComponent