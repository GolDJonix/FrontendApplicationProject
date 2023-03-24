import React, { useCallback, useEffect, useState } from 'react'
import Dropdown from '../components/DropDown'
import Movie from '../components/Movie'
import MovieType from '../types/MovieType'
import {Genres, SortOrder, SortedBy} from '../Constants'
import { getMovies,getFavoriteMovies } from '../API/Index'
import { MetaType, RespostaType } from '../types/RespostaType'


const Home = () => {
  const [selectedOption, setSelectedOption] = useState('No Filter')
  const [filteredMovies,setFilteredMovies] = useState<MovieType[]>([])
  const [favouriteMovies,setFavoriteMovies] = useState<MovieType[]>([])
  const [filteredGenres,setFilteredGenres] = useState<string[]>([])
  const [inputStringQuery,setInputStringQuery] = useState<string>('')
  const [pageQuery,setPageQuery] = useState<number>(0)
  const [metaInfo,setMetaInfo] = useState<MetaType>({page: 0,size: 10,total: 146})
  const [sortByOption, setSortByOption] = useState('Not Sorted')
  const [sortOrderOption, setSortOrderOption] = useState(SortOrder[0])

  const getMoviesFromApi = async () => {
    
    console.log('GetMoviesFromApi: ',filteredGenres, inputStringQuery,pageQuery,sortByOption, sortOrderOption)
    const result: RespostaType = await getMovies(filteredGenres, inputStringQuery, pageQuery, sortByOption, sortOrderOption)
    console.log(result)
    if(result.meta){
      setMetaInfo(result.meta)
    }
    if (result.data) setFilteredMovies(result.data)
    else console.error('NO DATA RECEIVED')
  }

  const getFavMoviesFromApi = async () => {
    /* console.log('query:',inputStringQuery) */
    const result: RespostaType = await getFavoriteMovies()
    /* console.log(result) */
    
    if (result.data) setFavoriteMovies(result.data)
    else console.error('NO DATA RECEIVED')
  }

  useEffect(() => {
    getMoviesFromApi()
    getFavMoviesFromApi()
  }, [filteredGenres, pageQuery, sortByOption, sortOrderOption])

  /* const refreshData = useCallback(() => {
    getMoviesFromApi()
    getFavMoviesFromApi()
  },[]) */

  const refreshData = () => {
    getMoviesFromApi()
    getFavMoviesFromApi()
  }

  const handleSelect = useCallback(async (newOption: string) => {
    setSelectedOption(newOption)

    if(newOption === 'No Filter'){
      setFilteredGenres([])
    } else {
      setFilteredGenres(old => {
        if (!old.includes(newOption)) {
          return [...old,newOption]
        }
        return old
      })
    }
  }, [])

  /*   const handleSortBy = (newOption: string) => {
    setSortByOption(newOption)
  } */
  const handleSortBy = useCallback(async (newOption: string) => {
    if(newOption === 'Not Sorted'){
      setSortByOption('')
    } else {
      setSortByOption(newOption)
    }
    
  },[])
  const handleSortOrderOption = useCallback(async (newOption: string) => {
    setSortOrderOption(newOption)
  },[])
  const handleSubmit = () => {
    console.log('Page: ', pageQuery)
    getMoviesFromApi()
  }
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputStringQuery(event.target.value)
  }
  const handlePreviousPage = () => {
    const newPage = pageQuery-1
    setPageQuery(newPage)
  }
  const handleNextPage = () => {
    const newPage = pageQuery+1
    setPageQuery(newPage)
  }
  const removeSelectedGenre = (genre:string) => {
    const newArray = filteredGenres.filter( (genreOld) => genre !== genreOld )
    setFilteredGenres(newArray)
    if (!newArray.length) setSelectedOption('No Filter')
  }
  const favMoviesIds = favouriteMovies.map(m => m.id)
  return (
    <div className="App" style={{ background: 'orange' }}>
      <div>
        {filteredGenres.map((genre) => (
          <button
            title='genre'
            key={genre}
            onClick={() => removeSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
      <div>
        <h1>Selected Option: {selectedOption}</h1>
        <Dropdown options={Genres} onSelect={handleSelect} />
       
        <input type="text" value={inputStringQuery} placeholder='Pesquisa por String' onChange={handleChangeInput} />

        <button onClick={handleSubmit}>Submit Filters</button>
        
        <Dropdown options={SortedBy} onSelect={handleSortBy} />

        <Dropdown options={SortOrder} onSelect={handleSortOrderOption} />

      </div>
      
      { pageQuery !== 0 ? <button onClick={handlePreviousPage}>Previous</button> : undefined}

      { pageQuery < Math.ceil(metaInfo.total / metaInfo.size)-1 ? <button onClick={handleNextPage}>Next</button> : undefined}
      
      
      {/* <button onClick={handleNextPage}>Next</button> */}
      <div style={{backgroundColor:'yellow',display:'flex'}}>
        <div style={{width:'100%',backgroundColor:'lightcoral'}}>
          {filteredMovies.map((movie) => {
            const isFavAux = favMoviesIds.includes(movie.id)
            return (
              <Movie
                key={movie.id}
                refresh={refreshData}
                isFav={isFavAux}
                movie={movie}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
