import React from 'react'
import { useLocation } from 'react-router-dom';

export default function NewsItem(props) {

let location=useLocation()
let {id,title,description,imageurl,url,source}=props;
const handleAdd=()=>{
  addNews(title,description,imageurl,url,source);
  getNews();
}
const handleDelete=()=>{
  deleteNews(id);
getNews();
}
const getNews = async () => {
  const response = await fetch("http://localhost:5000/api/news/fetchallnews", {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('NewsSpot-token')
    }
  });
  const result=await response.json()
  console.log(result)
//  await props.setMynews(result)
  console.log(typeof(props.mynews))
}
  const addNews = async (title,description,imageurl,url,source) => {
    try {
      const response = await fetch("http://localhost:5000/api/news/addnews", {
        method: "POST", // or 'PUT'
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('NewsSpot-token')
        },
        body: JSON.stringify({title,description,imageurl,url,source}),
      });

      const result = await response.json()
      console.log("Success:", result);
      // props.setMynews(props.mynews.push(result))
      alert("added successfully")
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const deleteNews = async(id) => {
    const response = await fetch(`http://localhost:5000/api/news/deletenews/${id}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('NewsSpot-token')
      }
    });
    const result=await response.json()
    console.log(result)
    props.setMynews(props.mynews.filter((news) => {
      return (news._id !== id)
    }))

  }
  
    
    return (
   
         <div className="card my-4" style={{width: "18rem"}} >   
  <img src={imageurl} className="card-img-top" alt="..."style={{width: "18rem",height:"12rem"}}/>
  <div className="card-body" >
    <h5 className="card-title">{title}...</h5>
    <span className="badge bg-secondary">Source: {source}</span>
    <p className="card-text">{description===null ?"Description is not available":description.slice(0,100)}...</p>
    <div className=' d-flex justify-content-between'>
    <a href={url} target='_blank' rel="noreferrer"  className="btn btn-primary">Read More</a>
    <button onClick={handleAdd} target='_blank' rel="noreferrer" s  className={`flex-end btn btn-success ${location.pathname==="/saved-news"?"d-none":""}`}>Save</button>
    <button onClick={handleDelete} target='_blank' rel="noreferrer"  className={`flex-end btn btn-danger ${location.pathname!=="/saved-news"?"d-none":""}`}>Remove</button>
  </div>
  </div>
</div>

   
    )
  }

