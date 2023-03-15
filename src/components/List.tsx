import { FC } from 'react'
import Movie from '../types/Movie'


const List: FC<{ movies: Movie[] }> = ({ movies }) => (
  <ul>
    {movies.map(({ title }) => <li>{title}</li>)}
  </ul>
)

export default List