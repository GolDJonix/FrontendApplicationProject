import React, { FC } from 'react'
import MovieType from '../types/MovieType'
import { useNavigate } from 'react-router-dom'

const MovieComponent: FC<{
  movie: MovieType
}> = ({movie}) => {
  const navigate = useNavigate()

  const onButtonClick = () => navigate(`/movie/${movie.id}`)

  return (  
    <div
      key={movie.id}
      style={{
        border:'solid 1px black',
        margin:'5px 0px',
        padding:'10px'
      }}
      onClick={onButtonClick}
    >
      {`${movie.id} - ${movie.title} - ${movie.year} `}
    </div>
  )
}

export default MovieComponent