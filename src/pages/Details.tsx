import React,{ useEffect, useState } from 'react'
import { getMovieById } from '../API/Index'
import { useNavigate, useParams } from 'react-router-dom'
import { RespostaSingleType } from '../types/RespostaType'
import MovieType from '../types/MovieType'

const Details = () => { 
  const [movie, setMovie] = useState<MovieType>()
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    getMovieByIdApi()
  },[])
  const getMovieByIdApi = async () => {
    const id = params.id ? parseInt(params.id): undefined
    if(id !== undefined){
      const result : RespostaSingleType = await getMovieById(id)
      setMovie(result.data)
    }
  }
  const onButtonBackClick = () => {
    navigate(-1)
  }
  return(
    <div style={{backgroundColor: 'yellow',textAlign: 'center'}}>
      <div style={{display: 'flex'}}>
        <h1>Details:</h1>
        <button onClick={onButtonBackClick}>Back</button>
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Year</th>
            <th>Runtime</th>
            <th>Genres</th>
            <th>Director</th>
            <th>Actors</th>
            <th>Plot</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`${movie?.id}`}</td>
            <td>{`${movie?.title}`}</td>
            <td>{`${movie?.year}`}</td>
            <td>{`${movie?.runtime}`}</td>
            <td>{`${movie?.genres}`}</td>
            <td>{`${movie?.director}`}</td>
            <td>{`${movie?.actors}`}</td>
            <td>{`${movie?.plot}`}</td>
            <td><img style={{width:100}} src={movie?.posterUrl}></img></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
} 
export default Details