import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'
import News from './Components/News'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default class App extends Component {
  constructor(){
    super()
 this.state={
  progress:0
 }
}
setProgress=(prog)=>{
this.setState({progress:prog})
}
  render() {
    return (
      <BrowserRouter  basename="/News-Spot">
      <Navbar/>
      <LoadingBar color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}/>
      <Routes>
      <Route path="/news-spot" element={<News setProgress={this.setProgress}/>}></Route>
        <Route index element={<News setProgress={this.setProgress}/>}></Route>
        <Route exact  path="/category/science" element={  <News setProgress={this.setProgress} key="science" category="science" />} ></Route> 
        <Route exact  path="/category/sports" element={<News setProgress={this.setProgress} key="sports" category="sports" />} ></Route> 
        <Route exact  path="/category/business" element={ <News setProgress={this.setProgress} key="business" category="business" />} ></Route> 
        <Route exact  path="/category/technology" element={ <News setProgress={this.setProgress} key="technology" category="technology" />} ></Route> 
        <Route exact  path="/category/health" element={ <News setProgress={this.setProgress} key="health" category="health" />} ></Route> 
      
        
      
      </Routes>
      </BrowserRouter>
    )
  }
}
