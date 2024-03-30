import React, { useState } from 'react'
import { useEffect } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

export default function NewsSearch(props) {
  const { search, setProgress } = props
  let navigate=useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 6
  const update = async () => {
    setProgress(20);
    setLoading(true)
    let url = `https://newsapi.org/v2/everything?q=${search}&apiKey=9dd8cea0eca2470c84fec3e770acf97b&page=${page}&pageSize=${pageSize}`
    let data = await fetch(url)
    props.setProgress(40)
    let parseData = await data.json();
    props.setProgress(80)
    console.log(parseData)
    await setArticles( parseData.articles);
    setLoading(false);
    setTotalResults( parseData.totalResults )
    props.setProgress(100)
  }
  // const previous = async () => {
  //   console.log("previous")
  //   await setPage(page - 1);

  //   update();

  // }
  // const next = async () => {
  //   console.log("next")
  //   await setPage(page + 1);
  //   update()
  // }
  const fetchData=async()=>{
    let data = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=9dd8cea0eca2470c84fec3e770acf97b&page=${page+1}&pageSize=${pageSize}`)
    await setPage(page+1)
    
     let parseData = await data.json();
  
    console.log(parseData)
      setArticles(articles.concat(parseData.articles));
     setTotalResults( parseData.totalResults )
 
   }
  useEffect(() => {
    if(localStorage.getItem('NewsSpot-token')){

      update();
     
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div className='container'>
    
      <h2 className='head'>Showing result for '{search}'</h2>
      {loading && <Spinner />}
      <InfiniteScroll
  dataLength={articles.length} 
  next={fetchData}
  hasMore={articles.length<totalResults}
  loader={<h4 style={{ textAlign: 'center' }}> Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }>
      <div className='row'>
        {
        !loading &&  articles.map((value) => {

            return (<div className='col' key={value.url}>
              <NewsItem title={value.title} description={value.description} imageurl={value.urlToImage} url={value.url} source={value.source.name} />
            </div>)

          })
        }
        {/* <div className='container d-flex justify-content-between'>
          <button disabled={page <= 1} type="button" className="btn btn-primary my-4" onClick={previous}> &larr; Previous</button>
          <button disabled={(page > Math.floor(totalResults / pageSize))} type="button" className="btn btn-primary my-4" onClick={next}>Next &rarr;</button>
        </div> */}
      </div>
      </InfiniteScroll>
    </div>
  )
}
