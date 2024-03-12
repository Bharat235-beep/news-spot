import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
export default function News(props) {
const pageSize=6;
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const update = async () => {
    props.setProgress(10)
    setLoading(true);
    
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=9dd8cea0eca2470c84fec3e770acf97b&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url)
    props.setProgress(40)
    let parseData = await data.json();
    props.setProgress(80)
    console.log(parseData)
    setArticles( parseData.articles);
    setLoading(false);
    setTotalResults( parseData.totalResults )
    // this.setState({ articles: parseData.articles, loading: false, totalResults: parseData.totalResults })
    props.setProgress(100)

  }
  const previous = async () => {
    console.log("previous")
    await setPage(page - 1);

    update();

  }
  const next = async () => {
    console.log("next")
    await setPage(page + 1);
    update()
  }
useEffect(()=>{
  update();
  // eslint-disable-next-line
},[])
 
  return (
    <div className='container'>

      {loading && <Spinner />}
      <div className='row'>
        {!loading && articles.map((value) => {

          return (<div className='col-md-4' key={value.url}>
            <NewsItem title={value.title} description={value.description} imageurl={value.urlToImage} url={value.url} source={value.source.name} />
          </div>)

        })}
        <div className='container d-flex justify-content-between'>
          <button disabled={page <= 1} type="button" className="btn btn-primary my-4" onClick={previous}> &larr; Previous</button>
          <button disabled={(page > Math.floor(totalResults / pageSize))} type="button" className="btn btn-primary my-4" onClick={next}>Next &rarr;</button>
        </div>
      </div>
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
