import React from 'react';
import {Header} from './HeaderComponent';

export class Create extends React.Component{
  render(){
    return (
      <div>
        <Header/>
        <div className="ArticleBody row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="mb-4 mt-4">
              <h1>Articles / create</h1>
            </div>
            <form action='http://localhost:8080/articles/' method="post" >
              <label for="inputEmail3" className="Create-h2">Title:</label>
              <div className="form-group row">
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputEmail3" name="title" placeholder="Title" required/>
                </div>
              </div>
              <label for="inputPassword3" className="Create-h2">Body:</label>
              <div className="form-group row">
                <div className="col-sm-10">
                  <textarea rows="6" className="form-control" id="inputPassword3" name="textarea" placeholder="Article body..." required></textarea>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary ArticleBody-btn">Create</button>
                  <a href="/articles" className="btn btn-primary ArticleBody-btn">Cancel</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
