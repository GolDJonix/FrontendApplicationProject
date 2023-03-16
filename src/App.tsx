import './App.css';
import { FC } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Details from './pages/Details';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="movie/:id" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;