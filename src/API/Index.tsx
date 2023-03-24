export const getMovies = (genres: string[],query: string,queryPage: number,sortBy: string,sortOrder: string) => {
  let genresToSend = ''
  let queryToSend = ''
  let queryPageToSend = `${queryPage}`
  let querySortByToSend = ''
  let querySortOrderToSend = ''
  if(genres.length){
    genresToSend = `genre=${genres.map(q => q).join(',')}${query}&`
  }
  if(query.length){
    queryToSend = `query=${query}&`
  }
  if(queryPage !== undefined){
    queryPageToSend = `page=${queryPage}&`
  }
  if(sortBy.length && sortBy !== 'Not Sorted'){
    querySortByToSend = `sortBy=${sortBy}&`
  }
  if(sortOrder.length && sortOrder !== 'No Order'){
    querySortOrderToSend = `sortOrder=${sortOrder}&`
  }
  
  console.log(`GETMOVIES: ?${genresToSend}${queryToSend}${querySortByToSend}${querySortOrderToSend}${queryPageToSend}`)
  return request('GET','',`?${genresToSend}${queryToSend}${querySortByToSend}${querySortOrderToSend}${queryPageToSend}`)
}

export const getFavoriteMovies = () => {
  return request('GET','fav','')
}

export const toggleFavoriteMovie = (idFav: number) => {
  return request('GET',`fav/${idFav}`,'')
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