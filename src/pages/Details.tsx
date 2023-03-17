import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MovieType from '../types/MovieType'
import { RespostaSingleType } from '../types/RespostaType'
import '../table.css'

const Details = () => {

  const navigate = useNavigate()
  const params = useParams()
  const [movie, setMovie] = useState<MovieType>()
  
  const onButtonClickBack = () => {
    navigate('/',{replace:true})
  }

  useEffect(() => {
    fetch(
      `http://localhost:3000/${params.id}`,
      {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => response.json())
      .then((data: RespostaSingleType) => setMovie(data.data))
      .catch((error) => {
        console.error('Error:', error)
      })
  },[])

  return (
    <div className='Details' style={{ background: 'orange' }}>

      <div style={{display:'flex',
        justifyContent: 'space-between'}}>
        <div>
            
        </div>
        <h1>Details</h1>
        <button  
          title='Back' 
          onClick={onButtonClickBack}>
                Back
        </button>
      </div>

      <div style={{backgroundColor:'yellow',display:'flex'}} >
        <div style={{
          width:'100%',
          backgroundColor:'lightcoral',
          border:'solid 1px black',
          margin:'5px 0px',
          padding:'10px'
        }}>
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
                <td> {`${movie?.plot}`}</td>
                <td><img style={{width:100}} src={movie?.posterUrl}></img></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Details