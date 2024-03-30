import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

export default function News(props) {
  const [mynews,setMynews]=useState([])
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
   await setMynews(result)
    console.log(typeof(mynews))
  }
const pageSize=11;
let navigate=useNavigate();
  const [articles, setArticles] = useState([]);
  let [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const update = async () => {
    props.setProgress(10)
    setLoading(true);
    
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=9dd8cea0eca2470c84fec3e770acf97b&page=${page}&pageSize=${pageSize}`)
    props.setProgress(40)
    let parseData = await data.json();
    props.setProgress(80)
   console.log(parseData)
    await setArticles( parseData.articles);
    setTotalResults( parseData.totalResults )
    setLoading(false);
    props.setProgress(100)
    // this.setState({ articles: parseData.articles, loading: false, totalResults: parseData.totalResults })

  }
//   const previous = async () => {
//     console.log("previous")
//   await setPage(page - 1);
// update();
    
//   }
//   const next = async () => {
//     console.log("next")
//  await   setPage(page + 1);
//    update();
      
//   }
  const fetchData=async()=>{
   
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=9dd8cea0eca2470c84fec3e770acf97b&page=${page+1}&pageSize=${pageSize}`)
    await setPage(page+1)
    let parseData = await data.json();
 
   console.log(parseData)
     setArticles(articles.concat(parseData.articles));
    setTotalResults( parseData.totalResults )

  }
useEffect(()=>{
  
  if(localStorage.getItem('NewsSpot-token')){

    update();
    getNews();
  }
  else{
    navigate('/login')
  }
  // eslint-disable-next-line
},[])
 
  return (
    <div className='container '>
 <h2 className='head'> {articles.length===0?" ":`Top Headlines-${props.category}`}</h2>
      {loading && <Spinner />}
      <InfiniteScroll
  dataLength={articles.length} 
  next={fetchData}
  hasMore={articles.length!==totalResults}
  loader={<h4 style={{ textAlign: 'center' }}> Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }>
      <div className='row justify-content-center '>
        {!loading && articles.map((value) => {

          return (<div className='col md-4 ' key={value.url}>
            <NewsItem getNews={getNews} title={value.title} description={value.description} imageurl={value.urlToImage} url={value.url} source={value.source.name} />
          </div>)

        })}
        {/* <div className='container d-flex justify-content-between'>
          <button disabled={page <= 1} type="button" className="btn btn-primary my-4" onClick={previous}> &larr; Previous</button>
          <button disabled={(page > Math.floor(totalResults / pageSize))} type="button" className="btn btn-primary my-4" onClick={next}>Next &rarr;</button>
        </div> */}
      </div>
      </InfiniteScroll>
    </div>

  )

}
News.defaultProps = {
  page: 1,
  pageSize: 6,
  category: "general"
}

News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number
}
