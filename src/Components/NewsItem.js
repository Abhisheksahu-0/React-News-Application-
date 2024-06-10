import React from 'react'

const NewsItem =(props)=>{
    let {title, description, imageUrl,newsUrl,author,date } = props;
    return (
      <div className='my-3' style={{width : "360px"}}>
        <div className="card" >
            <img src={!imageUrl?"https://www.usatoday.com/gcdn/authoring/images/10BEST/2023/03/27/USAT/70054659007-10BEST-401809-Fossil-Rim-Wildlife-Center.jpeg?crop=990,557,x0,y52&width=990&height=557&format=pjpg&auto=webp":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toUTCString()}</small></p>
                <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
