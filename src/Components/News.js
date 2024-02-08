import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
export default class News extends Component {
  articles = []
  static defaultProps={
    page:1,
    pageSize:6,
    category:"general"
  }

  static propTypes={
    category:PropTypes.string,
    pageSize:PropTypes.number
  }
  constructor() {
    super()
    this.state = {
      pageSize: 6,
      page: 1,
      articles: [],
      loading:true
    }
  }
  update=async()=>{
    this.props.setProgress(10)
    this.setState({loading:true})
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9dd8cea0eca2470c84fec3e770acf97b&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url)
    this.props.setProgress(40)
    let parseData = await data.json();
    this.props.setProgress(80)
    console.log(parseData)
    this.setState({ articles: parseData.articles,loading:false,totalResults:parseData.totalResults})
    this.props.setProgress(100)
    
  }
  previous = async  () => {
    console.log("previous")
    
    //  this.setState({page:this.state.page-1})
    // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9dd8cea0eca2470c84fec3e770acf97b&page=${this.state.page - 1}&pageSize=${this.state.pageSize}`;
    // let data = await fetch(url)
    // let parseData = await data.json();
    // console.log(parseData)
    await this.setState({
      
      page: this.state.page - 1,
      
    })
    this.update()
    
  }
  next = async () => {
    console.log("next")
    //this.setState({loading:true})
    // this.setState({page:this.state.page+1})
  //   if(!(this.state.page>Math.ceil(this.state.totalResults/this.state.pageSize)))
  //  { let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=9dd8cea0eca2470c84fec3e770acf97b&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`;
  //   let data = await fetch(url)
  //   let parseData = await data.json();
  //   console.log(parseData)}
   await this.setState({
          page: this.state.page + 1,
    })
    this.update()
    
  }
  async componentDidMount() {
    
    this.update();
  }

  render() {
    return (
      <div className='container'>
        
              {this.state.loading && <Spinner/>}
      <div className='row'>
        {!this.state.loading && this.state.articles.map((value) => {

          return (<div className='col-md-4' key={value.url}>
            <NewsItem title={value.title} description={value.description} imageurl={value.urlToImage} url={value.url} source={value.source.name} />
          </div>)

        })}
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-primary my-4" onClick={this.previous}> &larr; Previous</button>
          <button disabled={(this.state.page>Math.floor(this.state.totalResults/this.state.pageSize))} type="button" className="btn btn-primary my-4" onClick={this.next}>Next &rarr;</button>
        </div>
      </div>
      </div>

    )
  }
}
