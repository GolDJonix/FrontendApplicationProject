import React, { useState } from 'react'
import { useQuery,useMutation, gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { useNavigate,useParams } from 'react-router-dom'

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})
const GET_MOVIE = gql`
  query GetMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      year
      runtime
      genres
      director
      actors
      plot
      posterUrl
    }
  }
`
const EDIT_MOVIE = gql`
  mutation EditMovie(
    $id: Int!
    $title: String
    $year: String
    $runtime: String
    $genres: [String!]
    $director: String
    $actors: String
    $plot: String
    $posterUrl: String
  ) {
    editMovie(
      id: $id
      title: $title
      year: $year
      runtime: $runtime
      genres: $genres
      director: $director
      actors: $actors
      plot: $plot
      posterUrl: $posterUrl
    ) {
      id
      title
      year
      runtime
      genres
      director
      actors
      plot
      posterUrl
    }
  }
`
const EditMovieQL = () => {
  const [titleToEditQL,setTitleToEditQL] = useState<string>('') 
  const [yearToEditQL,setYearToEditQL] = useState<string>('')
  const [runtimeToEditQL,setRuntimeToEditQL] = useState<string>('')
  const [genresToEditToSendQL,setGenresToEditToSendQL] = useState<string[]>([])
  const [directorsToEditQL,setDirectorToEditQL] = useState<string>('')
  const [actorsToEditQL,setActorsToEditQL] = useState<string>('')
  const [plotToEditQL,setPlotToEditQL] = useState<string>('')
  const [urlToEditQL,setUrlToEditQL] = useState<string>('')
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id ? parseInt(params.id): undefined
  
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: id },
  })
  const [updateMovie] = useMutation(EDIT_MOVIE)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const onButtonBackClick = () => {
    navigate(-1)
  }
  const handleSubmitClick = () => {
    console.log(`data.movie.id: ${data.movie.id}`)
    console.log(`data.movie.title: ${data.movie.title}`)
    updateMovie({ variables: { 
      id: data.movie.id,
      title: titleToEditQL,
      year: yearToEditQL,
      runtime: runtimeToEditQL,
      director: directorsToEditQL,
      actors: actorsToEditQL,
      plot: plotToEditQL,
      posterUrl: urlToEditQL 
    } })
  }

  return (
    <div style={{backgroundColor: 'yellow',textAlign: 'center',padding:'5px'}}>
      
      <h1>Movie with Graphql: </h1>
      <button onClick={onButtonBackClick}>Back</button>
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
            <td>{`${data.movie.id}`}</td>
            <td>{`${data.movie.title}`}</td>
            <td>{`${data.movie.year}`}</td>
            <td>{`${data.movie.runtime}`}</td>
            <td>{`${data.movie.genres}`}</td>
            <td>{`${data.movie.director}`}</td>
            <td>{`${data.movie.actors}`}</td>
            <td>{`${data.movie.plot}`}</td>
            <td>{`${data.movie.posterUrl}`}</td>
          </tr>
        </tbody>
      </table> 
      <h1>EditMovie:</h1>
      <form onSubmit={handleSubmitClick}>
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
              <td><input value={titleToEditQL} type='string' onChange={(e) => setTitleToEditQL(e.target.value)}></input></td>
              <td><input value={yearToEditQL} type='number' onChange={(e) => setYearToEditQL(e.target.value)}></input></td>
              <td><input value={runtimeToEditQL} onChange={(e) => setRuntimeToEditQL(e.target.value)} type='number'></input></td>
              {/* <td><input value={genresToEdit} type='string' onChange={(e) => setGenresToEdit(e.target.value)}></input></td> */}
              <td><input value={directorsToEditQL} type='string' onChange={(e) => setDirectorToEditQL(e.target.value)}></input></td>
              <td><input value={actorsToEditQL} type='string' onChange={(e) => setActorsToEditQL(e.target.value)}></input></td>
              <td><input value={plotToEditQL} type='string' onChange={(e) => setPlotToEditQL(e.target.value)}></input></td>
              <td><input value={urlToEditQL} type='string' onChange={(e) => setUrlToEditQL(e.target.value)}></input></td>
            </tr>
          </tbody>
        </table>
      </form>
      <button onClick={handleSubmitClick}>Submit Changes</button>
      <div style={{backgroundColor: 'orangered',padding: '100px'}}>END</div>
    </div>
  )
}

export default EditMovieQL