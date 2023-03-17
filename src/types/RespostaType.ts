import MovieType from './MovieType'

export interface RespostaType {
    data: MovieType[]
    message: string
    meta: any
  }

export interface RespostaSingleType {
    data: MovieType
    message: string
    meta: any
  }