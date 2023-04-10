import React,{ useEffect, useState } from 'react'
import MovieType from '../types/MovieType'
import { useNavigate, useParams } from 'react-router-dom'
import { RespostaSingleType } from '../types/RespostaType'
import { getMovieById, putMovieById } from '../API/Index'

const EditMovie = () => {
  const [movie,setMovie] = useState<MovieType>()
  const [titleToEdit,setTitleToEdit] = useState<string>('')
  const [yearToEdit,setYearToEdit] = useState<string>('')
  const [runtimeToEdit,setRuntimeToEdit] = useState<string>('')
  const [genresToEditToSend,setGenresToEditToSend] = useState<string[]>([])
  const [directorsToEdit,setDirectorToEdit] = useState<string>('')
  const [actorsToEdit,setActorsToEdit] = useState<string>('')
  const [plotToEdit,setPlotToEdit] = useState<string>('')
  const [urlToEdit,setUrlToEdit] = useState<string>('')
  const params = useParams()
  const navigate = useNavigate()
  const onButtonBackClick = () => {
    navigate(-1)
  }
  const handleSubmitClick = () => {
    putEditMovieByIdApi()
    navigate(-1)
  }
  useEffect(() => {
    getMovieByIdApi()
  },[])

  const putEditMovieByIdApi = async() => {
    const id = params.id ? parseInt(params.id): undefined
    if(id !== undefined){
      const result : RespostaSingleType = await putMovieById(id,titleToEdit,yearToEdit,runtimeToEdit,genresToEditToSend,directorsToEdit,actorsToEdit,plotToEdit,urlToEdit)
      setMovie(result.data)
    }
  }
 
  const getMovieByIdApi = async () => {
    const id = params.id ? parseInt(params.id): undefined
    if(id !== undefined){
      const result : RespostaSingleType = await getMovieById(id)
      setMovie(result.data)
    }      
  }

  return (
    <div style={{backgroundColor: 'yellow',textAlign: 'center',maxWidth:'100%'}}>
      <div style={{display: 'flex',textAlign:'center'}}>
        <h1>Details: {`${movie?.title} - id:${movie?.id}`}</h1>
        <button onClick={onButtonBackClick}>Back</button>
      </div>
      <h1>Original:</h1>
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
            <td>{`${movie?.posterUrl}`}</td>
          </tr>
        </tbody>
      </table>
      <h1>EditMovie:</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Runtime</th>
            {/* <th>Genres</th> */}
            <th>Director</th>
            <th>Actors</th>
            <th>Plot</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input value={titleToEdit} type='string' onChange={(e) => setTitleToEdit(e.target.value)}></input></td>
            <td><input value={yearToEdit} type='number' onChange={(e) => setYearToEdit(e.target.value)}></input></td>
            <td><input value={runtimeToEdit} onChange={(e) => setRuntimeToEdit(e.target.value)} type='number'></input></td>
            {/* <td><input value={genresToEdit} type='string' onChange={(e) => setGenresToEdit(e.target.value)}></input></td> */}
            <td><input value={directorsToEdit} type='string' onChange={(e) => setDirectorToEdit(e.target.value)}></input></td>
            <td><input value={actorsToEdit} type='string' onChange={(e) => setActorsToEdit(e.target.value)}></input></td>
            <td><input value={plotToEdit} type='string' onChange={(e) => setPlotToEdit(e.target.value)}></input></td>
            <td><input value={urlToEdit} type='string' onChange={(e) => setUrlToEdit(e.target.value)}></input></td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSubmitClick}>Submit Changes</button>
      <div style={{backgroundColor: 'orangered',padding: '100px'}}>END</div>
    </div>
  )
} 
export default EditMovie