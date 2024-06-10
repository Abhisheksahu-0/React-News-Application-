import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>{

    const [articles, setArticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResult] = useState(0);
    
    // document.title = `NewsMonkey - ${this.capitalizeFirstLetter(props.category)}`;

    const capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async ()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true);
        props.setProgress(50);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(80);
        setArticles(parsedData.articles)
        setTotalResult(parsedData.totalResults)
        setloading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async() => {
        setPage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResult(parsedData.totalResults);
    };

    return (
        <>
        <h2 className='text-center' style={{margin : "20px 0px",marginTop : "80px"}}>News Monkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
        <div className="container">
            <div className="row">
            {articles.map((element, index) => {
                return (
                    <div className="col-md-4" key={`${element.url}-${element.publishedAt}-${index}`}>
                        <NewsItem
                            title={(element.title || "").slice(0, 45)}
                            description={(element.description || "").slice(0, 88)}
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}
                            author={element.author}
                            date={element.publishedAt}
                        />
                    </div>
                );
            })}
            </div>
        </div>
        </InfiniteScroll>
        </>
    )
}


News.defaultProps = { 
    country : 'in',
    pageSize : 5,
    category : 'general'
}

News.propTypes = {
    country : propTypes.string,
    pageSize : propTypes.number,
    category : propTypes.string
}


export default News







