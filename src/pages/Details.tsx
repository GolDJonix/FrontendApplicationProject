import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MovieType from '../types/MovieType'
import {RespostaSingleType, RespostaType} from '../types/RespostaType'

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
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then((response) => response.json())
     .then((data: RespostaSingleType) => setMovie(data.data))
     .catch((error) => {
    console.error("Error:", error);
    });
  },[])

    return (
      <div className='Details' style={{ background: 'orange' }}>

        <div style={{display:"flex",
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
        

        <div style={{backgroundColor:"yellow",display:"flex"}} >
          <div style={{width:"100%",
               backgroundColor:'lightcoral',
               border:"solid 1px black",
               margin:"5px 0px",
               padding:"10px"}}>
            {`${movie?.id} - ${movie?.title} - ${movie?.year}`}
          </div>
        </div>
      </div>
    );
  };
  
  export default Details;


