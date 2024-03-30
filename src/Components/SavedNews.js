import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SavedNews(props) {
    let location=useLocation()
   let navigate=useNavigate()
    const [loading, setLoading] = useState(true);
    const getNews = async () => {
        props.setProgress(20);
        setLoading(true)
      const response = await fetch("http://localhost:5000/api/news/fetchallnews", {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('NewsSpot-token')
        }
      });
      props.setProgress(60)
      const result=await response.json()
      props.setProgress(80)
      console.log(result)
     await props.setMynews(result)
      console.log(location.pathname)
      setLoading(false)
      props.setProgress(100)
    }
    useEffect(()=>{
      if(localStorage.getItem('NewsSpot-token')){

        getNews();
      }
      else{
        navigate('/login')
      }
    },[])
  return (
    <div className='container'>
     <h2 className='head'> {props.mynews.length===0?"Nothing to show":"Your news"}</h2>
          {loading && <Spinner />}
          <div className='row'>
      {
      !loading &&  props.mynews.map((value)=>{
            return (<div className='col md-4 ' key={value.url}>
             
            <NewsItem mynews={props.mynews} setMynews={props.setMynews}  id={value._id} title={value.title} description={value.description} imageurl={value.imageurl} url={value.url} source={value.source} />
          </div>)
        })
      }
      </div>
    </div>
  )
}
