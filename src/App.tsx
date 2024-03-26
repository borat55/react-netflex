import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="tv" element={<Tv />}>
          <Route path="/tv/:tvId" element={<Tv />}></Route>
        </Route>
        <Route path="search" element={<Search />}>
          <Route path="/search/:contentId/detail" element={<Tv />}></Route>
        </Route>
        <Route path="/" element={<Home />}>
          <Route path="/movies/:movieId" element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
