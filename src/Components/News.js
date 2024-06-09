import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    
    static defaultProps = { 
        country : 'in',
        pageSize : 5,
        category : 'general'
    }

    static propTypes = {
        country : propTypes.string,
        pageSize : propTypes.number,
        category : propTypes.string
    }

    capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading : true,
            page : 1,
            totalResults : 0
        }
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        this.props.setProgress(50);
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(80);
        this.setState({
            articles : parsedData.articles , 
            totalResults : parsedData.totalResults,
            loading : false
        })
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews();
    }

    // handelPreviousClick = async()=>{
    //     this.setState({page: this.state.page - 1});
    //     this.updateNews();
    // }

    // handelNextClick = async ()=>{
    //     this.setState({page: this.state.page + 1});
    //     this.updateNews();
    // }

    fetchMoreData = async() => {
        this.setState({page : this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : this.state.articles.concat(parsedData.articles) , 
            totalResults : parsedData.totalResults
        })
    };

    render() {
    return (
        <>
        <h2 className='text-center' style={{margin : "20px 0px"}}>News Monkey - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
        <div className="container">
            <div className="row">
            {this.state.articles.map((element, index) => {
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
}

export default News







