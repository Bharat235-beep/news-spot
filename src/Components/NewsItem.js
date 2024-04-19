import React from 'react'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function NewsItem(props) {

  let location = useLocation()
  let { id, title, description, imageurl, url, source } = props;
  const handleAdd = () => {
    addNews(title, description, imageurl, url, source);
    getNews();
  }
  const handleDelete = async() => {
await deleteNews(id)
await getNews()
Promise.all([deleteNews,getNews]).then(()=>{
  setTimeout(()=>{ props.setMynews(props.mynews.filter((news) => {
    return (news._id !== id)
  }))},2000)
 
})
    //  deleteNews(id).then(()=>{
    //   getNews().then(()=>{
        
    //   })
    //  })
    return true
     
  }
 
  const getNews = async () => {
    const response = await fetch("http://localhost:5000/api/news/fetchallnews", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('NewsSpot-token')
      }
    });
    const result = await response.json()
    console.log(result)
    //  await props.setMynews(result)
    console.log(typeof (props.mynews))
    return true;
  }
  const addNews = async (title, description, imageurl, url, source) => {
    try {
      const response = await fetch("http://localhost:5000/api/news/addnews", {
        method: "POST", // or 'PUT'
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('NewsSpot-token')
        },
        body: JSON.stringify({ title, description, imageurl, url, source }),
      });

      const result = await response.json()
      console.log("Success:", result);
      // props.setMynews(props.mynews.push(result))
      // alert("added successfully")
      toast.success('Saved Successfully!!')
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const deleteNews = async (id) => {
   
    try {const response = await fetch(`http://localhost:5000/api/news/deletenews/${id}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('NewsSpot-token')
      }
    });
    const result = await response.json()
   
    toast.error("Deleted Successfully!!")
    console.log(result)
    
    
    // alert("deleted")
    
    // setTimeout(()=>{props.setMynews(props.mynews.filter((news) => {
    //   return (news._id !== id)
    // }))},3000)

    return true;
}catch (error) {
  console.error("Error:", error);
}
  }


  return (
    <>
      <ToastContainer position="top-center" autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true} theme="colored"/>
      <div className="card my-4" style={{ width: "16rem" ,maxHeight:"30rem",minHeight:'30rem'}} >
        <img src={imageurl} className="card-img-top" alt="..." style={{ width: "16rem", height: "10rem" }} />
        <div className="card-body" >
          <h5 className="card-title">{title.slice(0,100)}...</h5>
          <span className="badge bg-secondary">Source: {source}</span>
          <p className="card-text">{description === null ? "Description is not available" : description.slice(0, 60)}...</p>
          <div className=' d-flex justify-content-between '>
            <a href={url} target='_blank' rel="noreferrer" className="btn btn-primary ">Read More</a>
            <button onClick={handleAdd} target='_blank' rel="noreferrer"  className={`flex-end btn btn-success ${location.pathname === "/saved-news" ? "d-none" : ""}`}><i className="fa-regular fa-bookmark"></i> Save</button>
            <button onClick={handleDelete} target='_blank' rel="noreferrer" className={`flex-end btn btn-danger ${location.pathname !== "/saved-news" ? "d-none" : ""}`}>Delete<i className="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
    </>

  )
}

