import React,{ FC, useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
import MovieType from '../types/MovieType'
import { toggleFavoriteMovie } from '../API/Index'

const MovieComponent: FC <{movie: MovieType,isFav: boolean,refresh:() => void}> = ({ movie,isFav,refresh }) => {
  const navigate = useNavigate()
  const onButtonClick = () => navigate(`/movie/${movie.id}`)
  const onEditButtonClick = () => navigate(`/editMovie/${movie.id}`)
  const onEditButtonQLClick = () => navigate(`/editMovieQL/${movie.id}`)
  const setMovieAsFavorite = useCallback(async (idFav: number) => {
    await toggleFavoriteMovie(idFav)
    refresh()
  },[]) 

  return (
    <div style={{ background: isFav === true ?  'green' : 'tomato', margin: '10px',padding: '5px'}}>
      {`${movie.id} - ${movie.year} - ${movie.title} - ${movie.runtime}`}
      <button onClick={() =>setMovieAsFavorite(movie.id)}> {isFav ? 'RemFav' : 'AddFav'}</button>
      <button onClick={(onEditButtonClick)}>Edit Movie</button>
      <button onClick={(onEditButtonQLClick)}>EditQL Movie</button>
      <button onClick={onButtonClick}>Details</button>
    </div>
  )
}

export default MovieComponent