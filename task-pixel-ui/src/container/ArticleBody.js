import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import DefaultArticles from '../components/DefArticles.js';
import PaginationArticles from '../components/PaginationArticles.js';
import ModalWindow from '../components/ModalWindow.js';
import {Redirect} from 'react-router-dom';

export class ArticleBody extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show: false,
      page_limit: false,
      page: "",
      limit: "",
      countPage: 10
    }

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.minWords = this.minWords.bind(this);
  }

  componentWillMount() {
    let page_limit = window.location.search.match(/\d+/g);
    if(page_limit != null){
      this.setState({
        page_limit: true,
        page:page_limit[0],
        limit:page_limit[1]
      });
      this.props.pagination(page_limit[0],page_limit[1]);
    } else {
      this.setState({
        page_limit: false,
        page:'',
        limit:''
      });
    }
  };

  show(e){
    this.props.modalUpdate(e.target.value);
    setTimeout(()=>{
      this.setState({
        show: true
      });
    },700)
  }

  hide(){
    this.setState({show: false});
  }

  minWords(elem){
    let minBodyWords = "";
    let minTitleWords = "";
    let masBodyText = elem.body.split(' ');
    let masTitleText = elem.title.split(' ');
    for(let i = 0; i < masBodyText.length; i++){
      if(minBodyWords.length < 25){
        minBodyWords += " " + masBodyText[i];
      } else{
        minBodyWords += "...";
        break;
      }
    }

    for(let i = 0; i < masTitleText.length; i++){
      if(minTitleWords.length < 15){
        minTitleWords += " " + masTitleText[i];
      } else{
        minTitleWords += "...";
        break;
      }
    }
    let obj = {
      minTitleWords,
      minBodyWords
    }

    return obj
  }

  render(){
    let countPage = Math.ceil(this.props.remoteArticles.length / (this.state.limit ? this.state.limit : 10));
    let items = [];
    for(let i = 1;  i<= countPage; i++) {
      let url = "http://localhost:8081/articles/?page=" + i + "&limit=" + (this.state.limit ? this.state.limit : 10);
      items.push(
          <Pagination.Item key={i} href={url}>
            {i}
          </Pagination.Item>
      );
    };

    return (
      <div className="ArticleBody">
        <div className="col-md-8 m-auto">
          <div className="row p-2">
            <div className="col-6 ArticleBody-title text-left">Articles</div>
            <div className="col-6 text-right">
              <a href="/articles/create"><button className="ArticleBody-btn btn btn-primary">Create</button></a>
            </div>
          </div>

          {this.state.page_limit == false ? <DefaultArticles minWords={this.minWords} show={this.show} defaultRemoteArticles={this.props.defaultRemoteArticles}/> : <PaginationArticles minWords={this.minWords}  show={this.show} paginationArticles={this.props.paginationArticles}/>}
          <ModalWindow stateShow={this.state.show} hide={this.hide} modalInfo={this.props.modalInfo}/>
          <Pagination >
            {items}
          </Pagination>
        </div>
      </div>
    );
  }
}
