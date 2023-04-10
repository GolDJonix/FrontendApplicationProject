import React,{useState,useCallback, useEffect} from 'react'
import MovieType from '../types/MovieType'
import { MetaType, RespostaType } from '../types/RespostaType'
import { getFavoriteMovies, getMovies } from '../API/Index'
import Movie from '../components/Movie'
import DropDown from '../components/DropDown'
import { Genres, SortOrder, SortedBy } from '../Constants'

const Home = () => {
  const [filteredMovies,setFilteredMovies] = useState<MovieType[]>([])
  const [filteredGenres,setFilteredGenres] = useState<string[]>([])
  const [favouriteMovies,setFavouriteMovies] = useState<MovieType[]>([])
  const [stringInput,setStringInput] = useState<string>('')
  const [selectedOption,setSelectedOption] = useState<string>('No Filter')
  const [sortBy,setSortBy] = useState<string>('Not Sorted')
  const [sortOrder,setSortOrder] = useState<string>('No Order')
  const [metaInfo,setMetaInfo] = useState<MetaType>({page:0,size: 0,total: 0})

  useEffect(() => {
    getMoviesFromApi(0)
    getFavoriteMoviesFromApi(0)
  },[filteredGenres,sortBy,sortOrder])

  const getMoviesFromApi = async (page:number) => {
    const result : RespostaType = await getMovies(filteredGenres,stringInput,page,sortBy,sortOrder)
    if(result.meta){
      setMetaInfo(result.meta)
    }
    if(result.data){
      setFilteredMovies(result.data)
    }
  }

  const getFavoriteMoviesFromApi = useCallback( async (page:number) => {
    console.log(`GetFavoriteMoviesFromApi: ${page}`)
    const resultFav : RespostaType = await getFavoriteMovies()
    if(resultFav.data){
      setFavouriteMovies(resultFav.data)
    }
  },[])

  const refreshFavData = () => {
    getMoviesFromApi(metaInfo.page)
    getFavoriteMoviesFromApi(metaInfo.page)
  }

  const removeSelectedGenre = (genre:string) => {
    console.log(`Vou remover o ${genre}`)
    const newArray = filteredGenres.filter((oldGenre) => genre !== oldGenre)
    setFilteredGenres(newArray)
  }

  const handleSelect = useCallback(async (option:string) => {
    setSelectedOption(option)
    if(option === 'No Filter'){
      setFilteredGenres([])
    } else {
      console.log(`Genre selecionado: ${option}`)
      setFilteredGenres( old => {
        console.log(filteredGenres.includes(option))
        if(!old.includes(option)){
          console.log(`Genero novo a acrescentar: ${option}`)
          return [...old,option]
        } else{
          console.log(`Genero repetido ${option}`)
          return old
        }
      })
    }
  },[])

  const handleSubmit = () => {
    getMoviesFromApi(0)
  }

  const handleSortedBySelect = useCallback(async (option: string) => {
    if(option !== 'Not Sorted'){
      setSortBy(option)
    } else
      setSortBy('')
      
  },[])
  const handleSortOrderSelect = useCallback(async (option:string) => {
    if(option !== 'No Order'){
      setSortOrder(option)
    } else 
      setSortOrder('')
  },[])

  const handlePrevPage = () => {
    getMoviesFromApi(metaInfo.page - 1)
  }

  const handleNextPage = () => {
    getMoviesFromApi(metaInfo.page + 1)
  }

  const favouriteMoviesIds = favouriteMovies.map(m =>m.id)
  return(
    <div style={{backgroundColor: 'yellow',textAlign: 'center',padding:'5px'}}>
      <h1>MovieList:</h1>
      <div style={{backgroundColor: 'tomato'/* , textAlign:'center' */}}>
        {filteredGenres.map(genre => <button key={genre} onClick={ () =>removeSelectedGenre(genre)}>{genre}</button>)}
      </div>
      <div>
        <DropDown options={Genres} isVisible={true} onSelect={handleSelect}/>
        <input type='text' value={stringInput} placeholder='String a pesquisar' onChange={(e) => setStringInput(e.target.value)}></input>
        <button type='submit' onClick={handleSubmit}>Submit</button>
        <DropDown options={SortedBy} isVisible={true} onSelect={handleSortedBySelect}/>
        {sortBy !== ('Not Sorted' && '') ?<DropDown options={SortOrder} isVisible={ sortBy !== 'Not Sorted' ? true : false} onSelect={handleSortOrderSelect}/> :''}
      </div>
      <div style={{padding: '20px',backgroundColor: 'orange'}}>
        {filteredMovies.map((movie) => {
          const isFavourite = favouriteMoviesIds.includes(movie.id) ? true : false
          return <Movie key={movie.id} isFav={isFavourite} refresh={refreshFavData} movie={movie} />
        })}
      </div> 
      {(metaInfo.page > 0)? <button onClick={handlePrevPage}>Prev</button> : ''} 
      {metaInfo.page < Math.ceil(metaInfo.total/metaInfo.size) - 1 ? <button onClick={handleNextPage}>Next</button> : '' }
    </div>
  )
}
export default Home