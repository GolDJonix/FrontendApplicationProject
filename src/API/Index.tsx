export const getMovies = (genres: string[],query: string,queryPage: number,sortBy: string,sortOrder: string) => {
  let genresToSend = ''
  let queryToSend = ''
  let queryPageToSend = `${queryPage}`
  let querySortByToSend = ''
  let querySortOrderToSend = ''
  if(genres.length){
    genresToSend = `genre=${genres.map(q => q).join(',')}&`
  }
  if(query.length){
    queryToSend = `query=${query}&`
  }
  if(queryPage !== undefined){
    queryPageToSend = `page=${queryPage}&`
  }
  if(sortBy.length && sortBy !== 'Not Sorted'){
    console.log(`SortBy: ${sortBy}`)
    querySortByToSend = `sortBy=${sortBy}&`
  }
  if(sortOrder.length && sortOrder !== 'No Order'){
    querySortOrderToSend = `sortOrder=${sortOrder}&`
  }
  return request('GET','',`?${genresToSend}${queryToSend}${querySortByToSend}${querySortOrderToSend}${queryPageToSend}`)
}

export const getMovieById = (idMovie:number) => {
  console.log(`getMovieById: movie/${idMovie}`)
  return request('GET',`${idMovie}`,'')
}

export const getFavoriteMovies = () => {
  return request('GET','fav','')
}

export const toggleFavoriteMovie = (idFav: number) => {
  return request('GET',`fav/${idFav}`,'')
}

export const putMovieById = (idEditMovie: number,queryTitle: string,queryYear: string,queryRuntime: string,queryGenres: string[],queryDirector: string,queryActors: string,queryPlot: string,queryUrl: string) => {
  let queryTitleToSend =''
  let queryYearToSend = ''
  let queryRuntimeTosend = ''
  let queryGenresToSend = ''
  let queryDirectorToSend = ''
  let queryActorsToSend = ''
  let queryPlotToSend = ''
  let queryUrlToSend = ''

  if (queryTitle) queryTitleToSend = `editTitle=${queryTitle}&`
  if (queryYear) queryYearToSend = `editYear=${queryYear}&`
  if (queryRuntime) queryRuntimeTosend = `editRuntime=${queryRuntime}&`
  if (queryGenres) queryGenresToSend = `editGenres=${queryGenres.map(q => q).join(',')}&`
  if (queryDirector) queryDirectorToSend = `editDirector=${queryDirector}&`
  if (queryActors) queryActorsToSend = `editActors=${queryActors}&`
  if (queryPlot) queryPlotToSend = `editPlot=${queryPlot}&`
  if (queryUrl) queryUrlToSend = `editUrl=${queryUrl}&`
  console.log('PUT',`edit/${idEditMovie}`,`${queryTitleToSend}${queryYearToSend}${queryRuntimeTosend}${queryGenresToSend}${queryDirectorToSend}${queryActorsToSend}${queryPlotToSend}${queryUrlToSend}`)
  return request('PUT',`edit/${idEditMovie}`,`?${queryTitleToSend}${queryYearToSend}${queryRuntimeTosend}${queryGenresToSend}${queryDirectorToSend}${queryActorsToSend}${queryPlotToSend}${queryUrlToSend}`)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = async (method: string, endPoint: string, queryParams: string): Promise<any> => {
  try {
    const response = await fetch(
      `http://localhost:3000/${endPoint}${queryParams}`,
      {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    console.log(data.data)
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}