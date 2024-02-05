import React, { Component } from 'react'

export default class NewsItem extends Component {
  
  render() {
    let {title,description,imageurl,url,source}=this.props;
    
    return (
      <div>
         <div className="card" style={{width: "18rem"}} >   
  <img src={imageurl} className="card-img-top" alt="..."style={{width: "18rem",height:"12rem"}}/>
  <div className="card-body" >
    <h5 className="card-title">{title.slice(0,50)}...</h5>
    <span className="badge bg-secondary">Source: {source}</span>
    <p className="card-text">{description===null ?"Description is not available":description.slice(0,100)}...</p>
    <a href={url} target='_blank' rel="noreferrer"  className="btn btn-primary ">Read More</a>
  </div>
</div>

      </div>
    )
  }
}
