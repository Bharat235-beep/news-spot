import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import News from './Components/News'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsSearch from './Components/NewsSearch';
import Signup from './Components/Signup';
import Login from './Components/Login';
import SavedNews from './Components/SavedNews';
export default function App() {
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("india");
  const [mynews,setMynews]=useState([])
  return (
    <BrowserRouter basename="/News-Spot">
      <Navbar setSearch={setSearch} />
      <LoadingBar color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)} />
      <Routes>
        <Route path="/news-spot" element={<News  setProgress={setProgress} />}></Route>
        <Route index element={<News  setProgress={setProgress} />}></Route>
        <Route exact path="/category/science" element={<News  setProgress={setProgress} key="science"  category="science" />} ></Route>
        <Route exact path="/category/sports" element={<News setProgress={setProgress} key="sports" category="sports" />} ></Route>
        <Route exact path="/category/business" element={<News setProgress={setProgress} key="business" category="business" />} ></Route>
        <Route exact path="/category/technology" element={<News setProgress={setProgress} key="technology" category="technology" />} ></Route>
        <Route exact path="/category/health" element={<News setProgress={setProgress} key="health" category="health" />} ></Route>
        <Route exact path="/category/entertainment" element={<News setProgress={setProgress} key="entertainment" category="entertainment" />} ></Route>
        <Route exact path="/search"  element={<NewsSearch setProgress={setProgress} search={search} key={search} />}></Route>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/saved-news" element={<SavedNews mynews={mynews} setMynews={setMynews} setProgress={setProgress}/>} />
      </Routes>
    </BrowserRouter>
  )

}
