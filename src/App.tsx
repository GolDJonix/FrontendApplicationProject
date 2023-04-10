import React from 'react'
import './App.css'
import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import EditMovie from './pages/EditMovie'
import EditMovieQL, { client } from './graphql/EditMovieQL'
import { ApolloProvider } from '@apollo/client'

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<Details />} />
            <Route path="editMovie/:id" element={<EditMovie />}/>
            <Route path="editMovieQL/:id" element={<EditMovieQL/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App