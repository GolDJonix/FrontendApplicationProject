import { FC,useState,useEffect, Dispatch, SetStateAction } from 'react'
import MovieType from '../types/MovieType'
import {RespostaSingleType} from '../types/RespostaType'
import { useNavigate } from 'react-router-dom'

const MovieComponent: FC<{
  movie: MovieType,
  setMovie: Dispatch<SetStateAction<MovieType | undefined>>
}> = ({movie, setMovie}) => {
    const navigate = useNavigate()

    

    const onButtonClick = () => {
      const id = movie.id
      navigate(`/movie/${movie.id}`);
    }
      
      

    return (  
      <div
        key={movie.id}
        style={{
          border:"solid 1px black",
          margin:"5px 0px",
          padding:"10px"
        }}
        onClick={onButtonClick}
      >
        {`${movie.id} - ${movie.title} - ${movie.year} `}
      </div>
    )
}

export default MovieComponent