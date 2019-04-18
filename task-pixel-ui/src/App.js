import React from 'react';
import './App.css';
import {Header} from './components/HeaderComponent';
import {ArticleBody} from './container/ArticleBody';
import {connect} from 'react-redux';
import {getDate, modalUpdate, pagination} from './store/action.js';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getDate();
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <ArticleBody remoteArticles={this.props.remoteART} defaultRemoteArticles={this.props.defaultRemoteArticles} paginationArticles={this.props.paginationPage} pagination={this.props.pagination} modalInfo={this.props.modalInfo} modalInfo={this.props.modalInfo} modalUpdate={this.props.modalUpdate}/>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    remoteART: state.remoteArticles,
    defaultRemoteArticles: state.remoteArticles.slice(0,10),
    modalInfo: state.modal,
    paginationPage: state.pagination
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    getDate: () => dispatch(getDate()),
    modalUpdate: (id) => dispatch(modalUpdate(id)),
    pagination: (page,limit) => dispatch(pagination(page,limit))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
