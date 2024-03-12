import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import News from './Components/News'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  const [progress,setProgress]=useState(0);
 
    return (
      <BrowserRouter  basename="/News-Spot">
      <Navbar/>
      <LoadingBar color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}/>
      <Routes>
      <Route path="/news-spot" element={<News setProgress={setProgress}/>}></Route>
        <Route index element={<News setProgress={setProgress}/>}></Route>
        <Route exact  path="/category/science" element={  <News setProgress={setProgress} key="science" category="science" />} ></Route> 
        <Route exact  path="/category/sports" element={<News setProgress={setProgress} key="sports" category="sports" />} ></Route> 
        <Route exact  path="/category/business" element={ <News setProgress={setProgress} key="business" category="business" />} ></Route> 
        <Route exact  path="/category/technology" element={ <News setProgress={setProgress} key="technology" category="technology" />} ></Route> 
        <Route exact  path="/category/health" element={ <News setProgress={setProgress} key="health" category="health" />} ></Route> 
        <Route exact  path="/category/entertainment" element={ <News setProgress={setProgress} key="entertainment" category="entertainment" />} ></Route> 
      
        
      
      </Routes>
      </BrowserRouter>
    )
  
}
